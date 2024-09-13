# Verx Backend

## 👨🏻‍🔧 Installation

Make sure the `.env` file is correctly set up, and then build a Docker image using the following command:

```
docker compose build
```

Once the image is built, start the container:

```
docker compose up -d
```

After the container is up, run the migrations with the following command:

```
docker compose exec verx-api npm run migration:run
```

Then, you can run the seeds with the folowing command:

```
docker compose exec verx-api npm run db:seed
```

That's all you need 🎉!

## TESTS

Before run the tests you need to install the dependencies:

```
npm install
```

And then you can run the tests with the following command:
```
npm run test
```

Deployed at:  http://34.229.95.135:3333/
Documentation: http://34.229.95.135:3333/docs/
