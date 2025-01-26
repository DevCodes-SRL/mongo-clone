# @devcodes-sdk/mongo-clone 🚀

`@devcodes-sdk/mongo-clone` is a powerful CLI tool that simplifies cloning MongoDB databases. With a single command, you can easily replicate collections and documents across databases, making data migration and replication seamless.

## Features ✨

- Clone MongoDB databases with ease.
- Progress bar for tracking the cloning process.
- Built-in error handling and informative logging.

## Installation 🔧

You can run the tool directly using `npx` (no installation required):

```bash
npx mongo-clone

npm install -g @devcodes-sdk/mongo-clone
```

## Usage 👨🏻‍💻

The tool requires the source and destination MongoDB URIs. Here's the command structure:

```bash
npx mongo-clone -s <SOURCE_MONGO_DB_URL> -d <DEST_MONGO_DB_URL>
```

## MongoDB URI Format 🍃

The MongoDB URI format is as follows:

`<database>` - The name of the database is required.

```bash
mongodb://<username>:<password>@<host>:<port>/<database>
```

## Notes 📝

Replace `username`, `password`, `host`, `port` and `database` with your actual database credentials and details.

Ensure that both the source and destination databases are accessible.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing 🤝

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/DevCodes-SRL/mongo-clone/issues).