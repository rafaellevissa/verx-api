# Verx Backend

Front-end link: [https://github.com/rafaellevissa/teste-frontend-amicci](https://github.com/rafaellevissa/teste-frontend-amicci)

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
make migrate
```

Then, you can run the seeds with the folowing command:

```
make seeder
```

That's all you need 🎉!

## TESTS

You can run the tests with the folowing command:

```
make integration-tests
```

Deploy feito em: https://dwxzajdn0dlqs.cloudfront.net/
Documentação da api: http://3.85.33.55:8000/swagger/
