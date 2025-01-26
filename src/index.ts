#!/usr/bin/env node

import { MongoClient } from "mongodb";
import { Command } from "commander";
import cliProgress from "cli-progress";
import { logger } from "./utils/logger";

const program = new Command();

program
  .usage("-s <SOURCE_MONGO_DB_URL> -d <DEST_MONGO_DB_URL>")
  .option("-s, --source <uri>", "Source MongoDB URI")
  .option("-d, --destination <uri>", "Destination MongoDB URI")
  .action((options) => {
    if (!options.source || !options.destination) {
      logger.error("Missing required options");
      logger.info(
        "USAGE: mongo-clone -s <SOURCE_MONGO_DB_URL> -d <DEST_MONGO_DB_URL>"
      );
      logger.info("MongoURL: mongodb://USER:PASS@HOST:PORT/DBNAME");

      process.exit(1);
    }
  })
  .parse(process.argv);

const { source, destination } = program.opts();

async function cloneDatabase(sourceUri: string, destinationUri: string) {
  const sourceClient = new MongoClient(sourceUri);
  const destinationClient = new MongoClient(destinationUri);

  try {
    logger.info("Connecting to the source database...");
    await sourceClient.connect();
    const sourceDb = sourceClient.db();

    logger.info("Fetching collections...");
    const collections = await sourceDb.listCollections().toArray();

    logger.info("Connecting to the destination database...");
    await destinationClient.connect();
    const destinationDb = destinationClient.db();

    const progressBar = new cliProgress.Bar(
      {
        format:
          "Cloning Progress | {bar} | {percentage}% | {value}/{total} collections",
      },
      cliProgress.Presets.rect
    );

    progressBar.start(collections.length, 0);

    for (const [index, { name: collectionName }] of collections.entries()) {
      const sourceCollection = sourceDb.collection(collectionName);
      const destinationCollection = destinationDb.collection(collectionName);

      const docs = await sourceCollection.find().toArray();

      if (docs.length) {
        await destinationCollection.insertMany(docs);
      }

      progressBar.update(index + 1);
    }

    progressBar.stop();
    logger.success("Database cloned successfully!");
  } catch (error: any) {
    logger.error("Error: ", error.message);
    process.exit(1);
  } finally {
    await sourceClient.close();
    await destinationClient.close();
  }
}

cloneDatabase(source, destination);
