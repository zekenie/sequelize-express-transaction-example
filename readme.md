# Example of automatic transactions in sequelize with express

If you hit the `/` request in this app, you'll see several queries logged

```
Executing (baae85be-9769-428e-9222-2388097f664e): START TRANSACTION;
Executing (baae85be-9769-428e-9222-2388097f664e): UPDATE "task" SET "latest"=false,"updated_at"='2017-11-12 20:15:36.509 +00:00'
Executing (baae85be-9769-428e-9222-2388097f664e): SELECT "id", "latest", "created_at", "updated_at" FROM "task" AS "task";
Executing (baae85be-9769-428e-9222-2388097f664e): INSERT INTO "task" ("id","latest","created_at","updated_at") VALUES (DEFAULT,true,'2017-11-12 20:15:36.522 +00:00','2017-11-12 20:15:36.522 +00:00') RETURNING *;
Executing (baae85be-9769-428e-9222-2388097f664e): COMMIT;
```

Notice they're all on the same transaction.

## Notes
- Inspired by `[koa-sequelize-transaction](https://github.com/mickhansen/koa-sequelize-transaction)`
- Uses `[cls-hooked](https://github.com/jeff-lewis/cls-hooked)` instead of `[node-continuation-local-storage](https://github.com/othiym23/node-continuation-local-storage)` because the original doesn't support async await. See this [issue](https://github.com/othiym23/node-continuation-local-storage/issues/98#issuecomment-317847871). This will probably get cleaned up in the future