-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "completedAte" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
