## Server:

# Run postgreSQL with docker
$ docker compose up dev-db -d

# generate type from prisma
$ npx prisma generate

# migrate database schema
$ npx prisma migrate dev

# run prisma studio to view database
$ npx prisma studio

## Client

## Root:

# run client and server apps
$ pnpm dev
