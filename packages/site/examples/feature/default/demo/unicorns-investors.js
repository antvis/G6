import { Graph } from '@antv/g6';

/**
 * Inspired by https://graphcommons.com/graphs/be8bc972-5b26-4f5c-837d-a34704f33a9e
 */
const data = {
  "nodes": [
    {
      "id": "e6351e4d-1ee5-47b9-9a06-ef950fc32d09",
      "data": {
        "type": "Company",
        "name": "Swiggy",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "476a5c9b-48fd-467b-9513-3e21d7cb9049",
      "data": {
        "type": "Company",
        "name": "Lime",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1f3b85b8-10fb-4b3d-b9f1-6ee6212a030a",
      "data": {
        "type": "Company",
        "name": "Zhuan Zhuan",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "660299b9-7bdc-4392-8a82-4a6285d73167",
      "data": {
        "type": "Company",
        "name": "Udemy",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0be578b1-0206-4eec-8329-592c135bddc6",
      "data": {
        "type": "Company",
        "name": "NuCom Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8a90286d-d304-4030-abc7-779ad5a0a4c2",
      "data": {
        "type": "Company",
        "name": "RigUp",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "48b557b5-2939-40d2-872f-e08597c57224",
      "data": {
        "type": "Company",
        "name": "STX Entertainment",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5efb9038-676c-49b6-a67e-0f7fde1d7d5b",
      "data": {
        "type": "Company",
        "name": "Atom Bank",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3befff07-86fe-4546-959b-01819a409bbd",
      "data": {
        "type": "Company",
        "name": "VANCL",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3b75ffc1-4bda-4889-b011-b3daceddb513",
      "data": {
        "type": "Company",
        "name": "Omio",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b4fdd1bf-165a-4bec-aa51-e7f010acb11c",
      "data": {
        "type": "Company",
        "name": "Coupang",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a657a180-8498-4ed0-be77-6dd2d8f455f5",
      "data": {
        "type": "Company",
        "name": "SentinelOne",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d1e20c19-9cd7-4efe-b477-a80d4189d9ed",
      "data": {
        "type": "Company",
        "name": "Nubank",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0baaf341-18b3-43ab-9a8e-fc3b47473583",
      "data": {
        "type": "Company",
        "name": "LinkDoc Technology",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "24fd7dea-fed7-45e1-997f-03f0679b4bdf",
      "data": {
        "type": "Company",
        "name": "Airbnb",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6c24a656-9cb5-4d4b-9780-513fa1d2b588",
      "data": {
        "type": "Company",
        "name": "BillDesk",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1d2cd6a2-c0ed-4b7f-9ded-67bb51411e78",
      "data": {
        "type": "Company",
        "name": "Monzo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "4e86ba7f-ea5a-4a1e-bcc3-c2587e04889f",
      "data": {
        "type": "Company",
        "name": "Snowflake Computing",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6d6cf97f-17b2-4f74-a184-59e4c5efe56f",
      "data": {
        "type": "Company",
        "name": "AppDirect",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c5c0582c-ad7c-4c13-bb69-8b8781c62906",
      "data": {
        "type": "Company",
        "name": "Affirm",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "93adb624-7b40-4c31-b59b-16e682fd3158",
      "data": {
        "type": "Company",
        "name": "Revolution Precrafted",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "1344ed94-d948-48ab-bb6a-1c29c3e5520e",
      "data": {
        "type": "Company",
        "name": "XPeng Motors",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e4ff2adf-2fa9-4ad4-8953-d551bb3c5d62",
      "data": {
        "type": "Company",
        "name": "Lightricks",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "0f6d15c3-3c3e-4ee4-9e73-997b15341630",
      "data": {
        "type": "Company",
        "name": "Riskified",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "733cdc8c-1040-452d-953b-50afb77d896f",
      "data": {
        "type": "Company",
        "name": "Udaan",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "629f961f-5de8-4f14-a71d-c03d02d13ac1",
      "data": {
        "type": "Company",
        "name": "Next Insurance",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "4e113348-c539-4dc8-8857-cbcf7afa651f",
      "data": {
        "type": "Company",
        "name": "ezCater",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2ed0b4c6-2158-4b3e-a5c6-e04bccbf6584",
      "data": {
        "type": "Company",
        "name": "Starry",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "1889c11e-4f31-4f1e-b2c4-6434f23849b6",
      "data": {
        "type": "Company",
        "name": "Vroom",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "778cb09d-d5cb-4bd5-b647-4f0a277b923e",
      "data": {
        "type": "Company",
        "name": "Huike Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "54759c90-be96-401d-871f-9239720a5540",
      "data": {
        "type": "Company",
        "name": "Rani Therapeutics",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "199dc595-ef32-4a39-91b7-2e35e4936377",
      "data": {
        "type": "Company",
        "name": "Huaqin Telecom Technology",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "bd82f509-9eb3-483f-a861-7b962a10b332",
      "data": {
        "type": "Company",
        "name": "UiPath",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "42df6388-76ff-4d05-8744-a1f75f959a90",
      "data": {
        "type": "Company",
        "name": "Nextdoor",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "804da41c-458a-4f87-9f6f-20d66d9291fa",
      "data": {
        "type": "Company",
        "name": "GoodRx",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b5f49582-98cc-405e-989f-37667a7b9ae0",
      "data": {
        "type": "Company",
        "name": "Tempus",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e27e4081-256e-439a-b4d4-2b59485f31e1",
      "data": {
        "type": "Company",
        "name": "Impossible Foods",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1ca74dfe-e0f3-48db-984e-172de8e3b9ac",
      "data": {
        "type": "Company",
        "name": "Medlinker",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "16a73c60-6c02-485b-8220-d2898a20bd3e",
      "data": {
        "type": "Company",
        "name": "DoorDash",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6b8d045a-9292-47f7-828e-df2fc14df240",
      "data": {
        "type": "Company",
        "name": "Leap Motor",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b81f9ab5-ffe4-400e-9a7b-e5afc612ecc9",
      "data": {
        "type": "Company",
        "name": "Delhivery",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "cfd674ee-87ea-4223-a221-d89e8d21fe9b",
      "data": {
        "type": "Company",
        "name": "Go-Jek",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7951b86c-7d31-4c7e-a628-92df6a57e05c",
      "data": {
        "type": "Company",
        "name": "Globality",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e2ce5fa5-108a-4b3f-b95d-4175d695f41f",
      "data": {
        "type": "Company",
        "name": "L&P Cosmetic",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6b95813d-47a0-4964-adcf-093772e3097c",
      "data": {
        "type": "Company",
        "name": "Formlabs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b563ac68-2c98-4ec4-9d2f-b28951353a97",
      "data": {
        "type": "Company",
        "name": "Aijia Life",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "dd30e3d8-081f-4d41-a170-127df79da289",
      "data": {
        "type": "Company",
        "name": "Coursera",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "f4bcde0d-96b3-467c-b75b-58c8060a0109",
      "data": {
        "type": "Company",
        "name": "Oscar Health",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0e6f4b56-a4c8-4418-8953-6b0be0e2d23d",
      "data": {
        "type": "Company",
        "name": "Ola Cabs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3e2eaf31-4b83-45aa-bf91-b14f5bb2bf54",
      "data": {
        "type": "Company",
        "name": "Wacai",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "96197637-2c00-4c9a-bbaa-56f278458c45",
      "data": {
        "type": "Company",
        "name": "Quora",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e962c729-6818-4db3-8d6d-abb3a57b6948",
      "data": {
        "type": "Company",
        "name": "Automation Anywhere",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2aea9b34-1a30-4ef9-a8e0-8c7520b5d57e",
      "data": {
        "type": "Company",
        "name": "Figure Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "bb1fbef1-6272-47f9-9086-920e36b2adbd",
      "data": {
        "type": "Company",
        "name": "FlixBus",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "289f573d-b649-4859-8179-f1589a3852a0",
      "data": {
        "type": "Company",
        "name": "Jusfoun Big Data",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "57b7f25b-a7e3-4e83-8f6d-db0717c81f50",
      "data": {
        "type": "Company",
        "name": "SenseTime",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "ceec1cc2-9102-4bef-895b-ce5f9b545dbf",
      "data": {
        "type": "Company",
        "name": "OVH",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "9525cfb5-845d-4146-b9f9-aae31ece2dcd",
      "data": {
        "type": "Company",
        "name": "Palantir Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "db07b2b7-c198-4ee6-8de7-aac5ef918907",
      "data": {
        "type": "Company",
        "name": "Tanium",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3a94bcc5-9f4b-4b79-a8c6-28b83d26682d",
      "data": {
        "type": "Company",
        "name": "Sila Nanotechnologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "31cedeb2-2536-4307-9d54-dd0647db2a7a",
      "data": {
        "type": "Company",
        "name": "CAOCAO",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "007e99d4-c9a1-491e-8dc1-804844476520",
      "data": {
        "type": "Company",
        "name": "Sisense",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "12f7c175-2e79-4993-a295-6f187be54475",
      "data": {
        "type": "Company",
        "name": "Orbbec Technology",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3bf6ca2b-357f-4506-9d56-761b7619ba32",
      "data": {
        "type": "Company",
        "name": "SoFi",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "4f5e5b02-533c-4a9d-bf46-ce78a433b03f",
      "data": {
        "type": "Company",
        "name": "58 Daojia",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c62cf018-06ea-4c21-b30e-3127f9eb54c0",
      "data": {
        "type": "Company",
        "name": "Epic Games",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0cecd1f1-0006-4815-8f72-f93c2cba356e",
      "data": {
        "type": "Company",
        "name": "Devoted Health",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8a6159f8-3ea1-41ca-bdda-2e909368fc5d",
      "data": {
        "type": "Company",
        "name": "About You",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "1a251845-3762-412c-aa8f-150646cf0522",
      "data": {
        "type": "Company",
        "name": "Desktop Metal",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "64b3645d-500a-4543-9d68-11de7f3243fc",
      "data": {
        "type": "Company",
        "name": "TuSimple",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6768c0d4-60d7-4618-958d-667540dd8ba6",
      "data": {
        "type": "Company",
        "name": "Checkr",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5c0552a2-5807-4724-9185-73d1432b7bb9",
      "data": {
        "type": "Company",
        "name": "PolicyBazaar",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "ae0271fd-9d12-4eae-b282-11017aefd32c",
      "data": {
        "type": "Company",
        "name": "Manbang Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "8a751304-811a-42b8-bdd4-2b281d13e752",
      "data": {
        "type": "Company",
        "name": "Glovo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "4c0e76a1-5894-4ec6-b1bd-ee4528d288b6",
      "data": {
        "type": "Company",
        "name": "Cabify",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "456c7aac-a41a-4616-91b7-3aff7e51c3b6",
      "data": {
        "type": "Company",
        "name": "Apus Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ee6220a6-c0d0-49de-a88c-af4bf8d5d8d0",
      "data": {
        "type": "Company",
        "name": "Tokopedia",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "33456226-bb85-4d15-9302-437f53a271c2",
      "data": {
        "type": "Company",
        "name": "Duolingo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ef91165b-efdd-4a15-a860-bf14bd2525a3",
      "data": {
        "type": "Company",
        "name": "Bitmain Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "883b19e1-8e82-45de-8247-82be991be67e",
      "data": {
        "type": "Company",
        "name": "Vice Media",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "b309cfb4-3234-4975-9b94-b42aea1ea4b6",
      "data": {
        "type": "Company",
        "name": "KnowBe4",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "cd98eb09-8171-467f-b468-72cd062ecca5",
      "data": {
        "type": "Company",
        "name": "Terminus Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "018e0cc1-7d11-4945-be9f-bac4d0b7e62c",
      "data": {
        "type": "Company",
        "name": "CMR Surgical",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "30c97b3d-96ff-4f35-bdd8-4a28204c92d6",
      "data": {
        "type": "Company",
        "name": "Xiaohongshu",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8a6532e8-dfab-461c-8b7c-ac532dae194e",
      "data": {
        "type": "Company",
        "name": "HighRadius",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "02f32b03-0703-4d8e-894e-efacfad8cbed",
      "data": {
        "type": "Company",
        "name": "Rent the Runway",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "28b0413c-2f34-41b3-863f-468642ff1ef4",
      "data": {
        "type": "Company",
        "name": "WeLab",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b26dc4d7-ee4c-4651-b555-25abd4fbce42",
      "data": {
        "type": "Company",
        "name": "Rivian",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "bfdf1c35-7ef6-4863-9ce2-7c446c7c50b0",
      "data": {
        "type": "Company",
        "name": "WTOIP",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7cc8c318-8106-4a4e-ba77-a7c47ca24ca2",
      "data": {
        "type": "Company",
        "name": "Dada-JD Daojia",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "edb921da-e644-4301-abe6-96f21c3e4bbe",
      "data": {
        "type": "Company",
        "name": "Zomato",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "a76e868a-cb4b-48df-8aab-413c84aea198",
      "data": {
        "type": "Company",
        "name": "Kendra Scott",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "8f4c5e58-6b09-4798-97f3-c4f495cbf725",
      "data": {
        "type": "Company",
        "name": "Bukalapak",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2a9cbcb8-6008-46f6-9712-cb5246a356de",
      "data": {
        "type": "Company",
        "name": "Sweetgreen",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "314aaa1d-c920-4e90-a42b-991bf6bcee91",
      "data": {
        "type": "Company",
        "name": "Carta",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "fae0ae6e-0827-4557-ad47-54cd34bb6ad4",
      "data": {
        "type": "Company",
        "name": "Meero",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "40e34763-9aa9-48c3-9cc6-892e0a5f4678",
      "data": {
        "type": "Company",
        "name": "XiaoZhu",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "90a57e9a-23c0-4c92-84ce-efdec4d66868",
      "data": {
        "type": "Company",
        "name": "Yanolja",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "176e8d26-f989-4d4d-8f9c-4fbc71a1fe20",
      "data": {
        "type": "Company",
        "name": "DT Dream",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "684474de-f7f4-4ed3-9d32-dc046745be98",
      "data": {
        "type": "Company",
        "name": "Pax Labs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d7750e37-3c50-4de0-91e1-84a5610522df",
      "data": {
        "type": "Company",
        "name": "Vipkid",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "45582e96-c54c-40f4-80bf-e929f5b81dbe",
      "data": {
        "type": "Company",
        "name": "Zume Pizza",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "babe938e-30d3-4229-8f79-07e4b9d046d7",
      "data": {
        "type": "Company",
        "name": "Scopely",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d3a322c4-4104-45ff-a6fc-fb94767c46d3",
      "data": {
        "type": "Company",
        "name": "Magic Leap",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "64321fb2-03e0-4455-b93b-731447c11b1c",
      "data": {
        "type": "Company",
        "name": "Gusto",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ba86f023-20ba-48f7-9a00-d4974d3dfca7",
      "data": {
        "type": "Company",
        "name": "ReNew Power",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "43a75144-7d51-4ffc-9bbb-e7ad0dec43eb",
      "data": {
        "type": "Company",
        "name": "C3",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0266f508-64f2-4239-916b-01946cd04f25",
      "data": {
        "type": "Company",
        "name": "UCommune",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "49b01e47-e09b-4199-8ef9-780c0cf9b9f2",
      "data": {
        "type": "Company",
        "name": "iTutorGroup",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "93d9bcb9-7815-4463-8025-0f76320b3a72",
      "data": {
        "type": "Company",
        "name": "Meicai",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "f435bf13-36a0-46bc-9ea9-593ae30741b5",
      "data": {
        "type": "Company",
        "name": "Anduril",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "025fe553-9237-469d-80bf-bb1d4903f5b6",
      "data": {
        "type": "Company",
        "name": "CureVac",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5bb08642-7ba4-4435-b0b5-16364c270aba",
      "data": {
        "type": "Company",
        "name": "Kaseya",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "f677575d-9276-4dc0-bb0c-f716fe1dcea3",
      "data": {
        "type": "Company",
        "name": "Cybereason",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "10342fe0-56da-4958-91e1-48feeac43c4f",
      "data": {
        "type": "Company",
        "name": "Calm",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8111f4b1-3051-4b85-82d5-00126dc133da",
      "data": {
        "type": "Company",
        "name": "MUSINSA",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "901943ce-5024-423c-9f52-886bf795b25d",
      "data": {
        "type": "Company",
        "name": "LIfeMiles",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7eeaa744-11c3-4230-a3e5-ecfa8677b87a",
      "data": {
        "type": "Company",
        "name": "Bright Health",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "fe69a11a-019b-4542-9cd3-ab7c8ea41b1c",
      "data": {
        "type": "Company",
        "name": "XANT",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d6c7cf8f-7a9c-4fc2-9fab-b11b482189de",
      "data": {
        "type": "Company",
        "name": "Convoy",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7c3013f0-2e0f-45ea-b954-6ed3cce5e210",
      "data": {
        "type": "Company",
        "name": "Celonis",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "17b96d28-b6df-4caa-949e-b7aa467aa436",
      "data": {
        "type": "Company",
        "name": "HeartFlow",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "69fd1220-77b6-4d1b-99cb-76a93e84d0ad",
      "data": {
        "type": "Company",
        "name": "Symphony Communication Services",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d4fa8435-1712-49c0-9552-e79a5c59bc5d",
      "data": {
        "type": "Company",
        "name": "Sprinklr",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d1f95e8d-b1d3-45c6-a24b-496e2ef6c455",
      "data": {
        "type": "Company",
        "name": "Alto Pharmacy",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "13fd2af5-8aac-4a11-8bc9-d3f162fd915d",
      "data": {
        "type": "Company",
        "name": "Uptake",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "78d5ed55-1b3b-4728-a26e-2b35710ecf02",
      "data": {
        "type": "Company",
        "name": "Age of Learning",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "915b067a-6a94-4cca-b4a4-8582150a48d6",
      "data": {
        "type": "Company",
        "name": "Afiniti",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b286c9b3-6323-47b0-92e5-e6f80b4ac7a5",
      "data": {
        "type": "Company",
        "name": "Segment",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e738f426-ebb4-4def-a89a-1fe83bdd69b4",
      "data": {
        "type": "Company",
        "name": "monday.com",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "62818a74-7d9c-4217-900d-be4fef18de20",
      "data": {
        "type": "Company",
        "name": "23andMe",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d0cfc2b4-13a5-4a23-acb5-7cf2ff122b9a",
      "data": {
        "type": "Company",
        "name": "Auto1 Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "7962b95e-7ff3-4817-91dd-20caa6985a5d",
      "data": {
        "type": "Company",
        "name": "Luoji Siwei",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "abe0f28a-a27f-42c0-87bc-5ab30820a49a",
      "data": {
        "type": "Company",
        "name": "Loggi",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "e80f4a2e-45bc-45c5-8a7d-24f1f637392a",
      "data": {
        "type": "Company",
        "name": "Dream11",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "51237bae-e942-44bd-ace6-02b552253d85",
      "data": {
        "type": "Company",
        "name": "Sumo Logic",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2309158e-ffc0-4a41-984e-35eefdc54be5",
      "data": {
        "type": "Company",
        "name": "InSightec",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0eebf2c9-72d3-417c-ba40-204090fc975d",
      "data": {
        "type": "Company",
        "name": "Ziroom",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "19e283f2-054e-424e-a43d-5719a12b3c0b",
      "data": {
        "type": "Company",
        "name": "Zhangmen",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c3fa8315-aa75-4bcc-be83-699d89a62a86",
      "data": {
        "type": "Company",
        "name": "TransferWise",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "1b681072-4e3a-44a2-932a-d22fc943f75b",
      "data": {
        "type": "Company",
        "name": "Doctolib",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ffc24834-8795-413c-8279-f9ad7ac19902",
      "data": {
        "type": "Company",
        "name": "Thumbtack",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7e639f23-ee68-4e89-a7b7-fd0db884f513",
      "data": {
        "type": "Company",
        "name": "Course Hero",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "bf924006-8ce7-4f92-9d85-fb1857ff4762",
      "data": {
        "type": "Company",
        "name": "Red Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "3bc21ecd-15f5-4301-940e-69367b95f91a",
      "data": {
        "type": "Company",
        "name": "Aurora",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5366f0eb-e298-4455-a99a-167723d55aed",
      "data": {
        "type": "Company",
        "name": "United Imaging Healthcare",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7f3a9db1-c355-443d-b52f-799742a304ff",
      "data": {
        "type": "Company",
        "name": "Canva",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3e95d76a-2dc5-4abb-9b75-2a67b2eb86ca",
      "data": {
        "type": "Company",
        "name": "Yuanfudao",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8622747d-791f-4362-bbfa-0f26e2154ebc",
      "data": {
        "type": "Company",
        "name": "Krafton Game Union",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ce27df86-6faf-4d1f-be9c-d0b109326eb1",
      "data": {
        "type": "Company",
        "name": "Cambricon",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "be716aa4-fad4-498e-9ac8-8a0c03706222",
      "data": {
        "type": "Company",
        "name": "Fair",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a9a7112b-c56e-478e-aed7-51200fb9d404",
      "data": {
        "type": "Company",
        "name": "Guild Education",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "265c372a-2c88-490b-9440-5929df209beb",
      "data": {
        "type": "Company",
        "name": "Machine Zone",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "02381b5c-99e2-4114-884d-d72612a2cb57",
      "data": {
        "type": "Company",
        "name": "Hello TransTech",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "4ce47ed5-c01b-4930-a91b-ed2688adce7b",
      "data": {
        "type": "Company",
        "name": "Faire",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0e6d336d-2866-4217-95f8-62979f825b36",
      "data": {
        "type": "Company",
        "name": "ironSource",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "fe17cdf6-95ac-41b2-9b46-2e3f790cf967",
      "data": {
        "type": "Company",
        "name": "Rapyd",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a5aa1bce-38e4-473c-af03-739429061381",
      "data": {
        "type": "Company",
        "name": "Snapdeal",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "486dfe68-5a96-45e4-a77f-e44ae90988d5",
      "data": {
        "type": "Company",
        "name": "Lyell Immunopharma",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "aec03ac9-fc1a-4198-9865-100c59cf4eb3",
      "data": {
        "type": "Company",
        "name": "StockX",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "489d885a-e548-41da-9c72-b8150c39b2ff",
      "data": {
        "type": "Company",
        "name": "wefox Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8a777b32-52ab-4638-ba5a-be3c9a881949",
      "data": {
        "type": "Company",
        "name": "LinkSure Network",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "32fa9e87-4068-4041-845a-38463f418497",
      "data": {
        "type": "Company",
        "name": "Unity Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a2beb18f-7f64-42a7-9bfd-06e9e60869f6",
      "data": {
        "type": "Company",
        "name": "Allbirds",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "08e649c1-ddca-4c46-9543-6e46616bafbb",
      "data": {
        "type": "Company",
        "name": "Headspin",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "257b19d9-168a-4e95-acf8-693dfe6980cb",
      "data": {
        "type": "Company",
        "name": "Procore Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8791511c-c6b3-44f4-9f02-1b31e626c368",
      "data": {
        "type": "Company",
        "name": "Lemonade",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2ca9f5f4-9b36-4297-99ad-30fb56df51e1",
      "data": {
        "type": "Company",
        "name": "Dataiku",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "07804ef2-5d9a-4de2-8f5a-d86eec1fa9c7",
      "data": {
        "type": "Company",
        "name": "Grammarly",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "829c3044-d492-4964-ae5f-5f9a868606ed",
      "data": {
        "type": "Company",
        "name": "Pat McGrath Labs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "46187658-fad3-4b97-a0de-c7dec8bacf30",
      "data": {
        "type": "Company",
        "name": "Dadi Cinema",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "240cd8e9-51b5-4ecf-85f6-efc55cd9591c",
      "data": {
        "type": "Company",
        "name": "Rubrik",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "bda4f2c3-dc0e-4c26-bc1d-d483acc334cf",
      "data": {
        "type": "Company",
        "name": "BGL Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0ac3a52a-b636-486d-b873-19585027154d",
      "data": {
        "type": "Company",
        "name": "Darktrace",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "275e66ee-02e4-4085-a5ff-7b0b7dac5cdc",
      "data": {
        "type": "Company",
        "name": "Gympass",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "f2ddabce-6e2a-4a73-8922-be4d8e93c3a9",
      "data": {
        "type": "Company",
        "name": "Wildlife Studios",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "95a837a9-ac33-4fda-95f0-21f0d7636d85",
      "data": {
        "type": "Company",
        "name": "MINISO Life",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "5629ee41-b18a-4398-b1eb-5fd86265609c",
      "data": {
        "type": "Company",
        "name": "Nuvei",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "28a49b42-e42c-47d3-af49-2636b36fd23d",
      "data": {
        "type": "Company",
        "name": "DataRobot",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7983d8e2-2ec3-4380-94f2-190455d40f02",
      "data": {
        "type": "Company",
        "name": "Rappi",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "af66a06b-a514-4210-8e26-2b0fc853420d",
      "data": {
        "type": "Company",
        "name": "Face++ (Megvii)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "876ea202-405d-46b5-8339-21f169dc0192",
      "data": {
        "type": "Company",
        "name": "Branch",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "4ad846c6-2692-4b3b-85c4-cdc0cc9bedf3",
      "data": {
        "type": "Company",
        "name": "QuintoAndar",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3602f7bc-9a6f-4aed-93bf-d11848d99f77",
      "data": {
        "type": "Company",
        "name": "GetYourGuide",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3a0c9340-3aab-448e-80ad-d05f73277fa6",
      "data": {
        "type": "Company",
        "name": "iCarbonX",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "07abf887-c3cd-43f9-84f7-4899f863abef",
      "data": {
        "type": "Company",
        "name": "Liquid",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5b8c0ea7-e21d-42d5-bd0f-10ff14aa8334",
      "data": {
        "type": "Company",
        "name": "4Paradigm",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "296bfb58-780c-477f-9660-1d181192ab64",
      "data": {
        "type": "Company",
        "name": "Preferred Networks",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8f4774af-fcc1-4fd3-9dc6-58511e7d0d35",
      "data": {
        "type": "Company",
        "name": "BlaBlaCar",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ea3b1c9c-3065-47b9-a5a9-d6e6cf8f6c89",
      "data": {
        "type": "Company",
        "name": "Away",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2db067c7-e9e9-45c6-aca6-34844723976b",
      "data": {
        "type": "Company",
        "name": "Loft",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "fe12bffe-7408-425b-9dc4-c5ff28606f54",
      "data": {
        "type": "Company",
        "name": "100credit",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "9d3429c7-5209-44a6-924a-5e413cba729d",
      "data": {
        "type": "Company",
        "name": "Gan & Lee Pharmaceuticals",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3650a107-d8f7-47b2-b9bc-b6ecc12f59df",
      "data": {
        "type": "Company",
        "name": "Yidian Zixun",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "dcf0975e-c6b0-4fac-a1db-a7faa8f064d9",
      "data": {
        "type": "Company",
        "name": "Lalamove",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "fc5c34bf-6560-4dfb-9140-0c7644c3c869",
      "data": {
        "type": "Company",
        "name": "Icertis",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e35f0c96-7e0f-42d0-b5aa-6a2a89adb9ca",
      "data": {
        "type": "Company",
        "name": "Grove Collaborative",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6753f7c0-881d-49a2-aea4-22b2ddd11f9b",
      "data": {
        "type": "Company",
        "name": "OneTrust",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "aa9e49d5-3bb2-4135-9d1b-dc4f7fd0e44f",
      "data": {
        "type": "Company",
        "name": "Judo Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d02ae7c4-3851-4453-aece-8594b1604cca",
      "data": {
        "type": "Company",
        "name": "Cell C",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "f4ddf63d-d4b9-4fac-ac6b-686f9ecbfb8f",
      "data": {
        "type": "Company",
        "name": "Cohesity",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c9835829-e478-432e-b644-e7c26b794b0d",
      "data": {
        "type": "Company",
        "name": "Verkada",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "20119420-2788-47bf-88b4-7daa6dd24c09",
      "data": {
        "type": "Company",
        "name": "BYTON",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d29b5c0b-d5f0-4143-a4e1-7a81f5c75a9a",
      "data": {
        "type": "Company",
        "name": "Gett",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b8c4508f-b76e-4fb9-8995-55bd76ac60c0",
      "data": {
        "type": "Company",
        "name": "Carbon",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c95b1106-541f-4ebe-8865-84ed594e3f0c",
      "data": {
        "type": "Company",
        "name": "SmartNews",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ea763d7e-9d52-41c5-971b-9a5bad17cb77",
      "data": {
        "type": "Company",
        "name": "ThoughtSpot",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "64e140a8-8c5e-4a62-a735-b314fe7fea6d",
      "data": {
        "type": "Company",
        "name": "Vista Global",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4a381f04-ff79-4fd4-8bfb-84bb740bc3ad",
      "data": {
        "type": "Company",
        "name": "Revolut",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8f76bfef-886b-46ce-ae0d-e23c2de5f0c8",
      "data": {
        "type": "Company",
        "name": "AIWAYS",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "78465e07-e451-4fee-bc19-8a7f4470b2ed",
      "data": {
        "type": "Company",
        "name": "The Hut Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ac74b43e-4221-4756-a790-bd3333d427e2",
      "data": {
        "type": "Company",
        "name": "Proteus Digital Health",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0989c9c6-9a04-4df4-b20c-a65af39af17e",
      "data": {
        "type": "Company",
        "name": "Dataminr",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1ec8b3e6-b2a2-4845-9a0f-ccf45e4316d2",
      "data": {
        "type": "Company",
        "name": "Katerra",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "79bf9be2-ade2-471f-bc24-d6c7982aee81",
      "data": {
        "type": "Company",
        "name": "You & Mr Jones",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2622ea66-8866-4b1a-b42c-73de3fad34ae",
      "data": {
        "type": "Company",
        "name": "JFrog",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ff2cbd5a-fd38-4d13-b91f-2471dcd72262",
      "data": {
        "type": "Company",
        "name": "Horizon Robotics",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "dcb7ba91-784b-409a-bc4f-682f974ce1df",
      "data": {
        "type": "Company",
        "name": "Toutiao (Bytedance)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "5912d4cc-80de-4fa8-aa4c-ba0513bf409f",
      "data": {
        "type": "Company",
        "name": "eDaili",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "03a3004d-358e-4d32-aa57-679baa67be02",
      "data": {
        "type": "Company",
        "name": "Marqeta",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b6e0e945-ca73-4e24-ac58-6e1654d18803",
      "data": {
        "type": "Company",
        "name": "Samsara Networks",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "a0b086af-0b88-45d8-a5ce-cc8eeefd7423",
      "data": {
        "type": "Company",
        "name": "Zhaogang",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "29fbfef5-4427-454d-a253-9453fc041f17",
      "data": {
        "type": "Company",
        "name": "Turo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7dc155e4-477b-46d5-ad4b-bfb40a120bf1",
      "data": {
        "type": "Company",
        "name": "Ivalua",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5251adc1-caa8-44ac-9f98-3e03f0b5090e",
      "data": {
        "type": "Company",
        "name": "Wemakeprice",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "d34f163b-3fdf-4c47-9a94-321d2ec4509b",
      "data": {
        "type": "Company",
        "name": "Automattic",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "780b4b7f-40fa-4924-a55c-0fd4998d32f9",
      "data": {
        "type": "Company",
        "name": "AppLovin",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "119b1a90-0eeb-45a1-a354-7230019ea377",
      "data": {
        "type": "Company",
        "name": "Docker",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1e4b74e6-634a-46ec-9a79-c25f9057d830",
      "data": {
        "type": "Company",
        "name": "Skydance Media",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6eb30306-cec2-4b91-bb77-023e0449dc1a",
      "data": {
        "type": "Company",
        "name": "Numbrs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "7f5891c5-b722-4564-97fe-09b0181efcc4",
      "data": {
        "type": "Company",
        "name": "Actifio",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e2e9b126-b4b7-42d4-9788-196b23bb9ceb",
      "data": {
        "type": "Company",
        "name": "Oxford Nanopore Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5d3a28eb-92d4-4aca-9d73-a03cbf511f11",
      "data": {
        "type": "Company",
        "name": "Samumed",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "cc1d948d-f8e3-4a55-9acb-faba01e5c41d",
      "data": {
        "type": "Company",
        "name": "SMS Assist",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7cd320c0-ec71-422f-806e-ed8d85426265",
      "data": {
        "type": "Company",
        "name": "One97 Communications",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "4b9e81fe-c14f-4fac-99cd-025ac79bc6fe",
      "data": {
        "type": "Company",
        "name": "ACV Auctions",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b6dfd0ad-c76e-4d98-9166-4fe62e6094e6",
      "data": {
        "type": "Company",
        "name": "Graphcore",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "30345443-4007-405c-9f52-6fbd826d7fa6",
      "data": {
        "type": "Company",
        "name": "Mafengwo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "9dd69c21-a944-42a1-b1e0-be534030a55a",
      "data": {
        "type": "Company",
        "name": "Klarna",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "9295edce-46ff-43b1-b9be-c6b524629bb3",
      "data": {
        "type": "Company",
        "name": "TangoMe",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3d9a251a-4cb5-438a-9ef9-c429f4eb4597",
      "data": {
        "type": "Company",
        "name": "Vinted",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "9f97bb7c-2f01-40f0-bcc2-8bb20bd93e21",
      "data": {
        "type": "Company",
        "name": "GitLab",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "81e0dd1f-2c0a-4a73-93ac-b7d87d8318d8",
      "data": {
        "type": "Company",
        "name": "Stripe",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1bf59584-2fda-4687-9626-144d4c9a37a8",
      "data": {
        "type": "Company",
        "name": "Circle Internet Financial",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8298c861-30f5-40ab-823e-c028301a6402",
      "data": {
        "type": "Company",
        "name": "GRAIL",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "dc709f38-22f8-4998-8698-2fac3dfef097",
      "data": {
        "type": "Company",
        "name": "Roivant Sciences",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "297c9aca-665d-44ae-b444-47c6dbb3d7d9",
      "data": {
        "type": "Company",
        "name": "JOLLY Information Technology",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "24f47c94-80d0-410d-8823-386b4b1f57a4",
      "data": {
        "type": "Company",
        "name": "LegalZoom",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "adb0c5fa-92c8-45cf-ab55-a6a674c9cb3c",
      "data": {
        "type": "Company",
        "name": "Poizon",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b0a2bdfd-f536-4003-aeb8-59af746821a7",
      "data": {
        "type": "Company",
        "name": "Sonder",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d13f55e3-d1bd-4a34-beaa-d3be48bea4ec",
      "data": {
        "type": "Company",
        "name": "Databricks",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "122a0e2f-cb41-4c30-808e-820e3594e71c",
      "data": {
        "type": "Company",
        "name": "Compass",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b74bbdb6-20ae-4afb-9921-1d791201d62a",
      "data": {
        "type": "Company",
        "name": "Nuro",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c86156c1-42b6-42b4-a7db-3431e2b648df",
      "data": {
        "type": "Company",
        "name": "OCSiAl",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "b10eba88-df54-4ee2-9c34-6ae63ebdc709",
      "data": {
        "type": "Company",
        "name": "Butterfly Network",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "5e63785e-1ba8-4dd1-8127-5e1c1867269d",
      "data": {
        "type": "Company",
        "name": "Maimai",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7ff5d607-4d2f-4ff9-bf65-fc8a7a9fb6d1",
      "data": {
        "type": "Company",
        "name": "MediaMath",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "66bb42f0-8248-4af1-ada2-9201740209e4",
      "data": {
        "type": "Company",
        "name": "Tongdun Technology",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "21d3c45e-1492-4649-8a5c-a4f621f776e9",
      "data": {
        "type": "Company",
        "name": "Auth0",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "29f775e5-a87f-4f66-8175-d1b57c0b16ae",
      "data": {
        "type": "Company",
        "name": "SouChe Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6b71913d-fef4-422b-b086-862ba35ab1c4",
      "data": {
        "type": "Company",
        "name": "Northvolt",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ba547d6e-af85-4e75-8443-1c5b877a2d5e",
      "data": {
        "type": "Company",
        "name": "Vox Media",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3012f674-523c-4c81-abe3-d1be9e2de3a4",
      "data": {
        "type": "Company",
        "name": "17zuoye",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "80010e00-e158-4d86-9c1d-477d3897c0c9",
      "data": {
        "type": "Company",
        "name": "Payoneer",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "073eecc9-57e0-4260-a364-bb3a6f1d4269",
      "data": {
        "type": "Company",
        "name": "ServiceTitan",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e00457b2-97ca-4b03-8661-5f8af42d2479",
      "data": {
        "type": "Company",
        "name": "Shansong Express (FlashEx)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0605b001-eab3-4cf0-8cb1-05ff21e56ea2",
      "data": {
        "type": "Company",
        "name": "Traveloka",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8fb9abcc-cc6c-475b-8895-8f74b77c9404",
      "data": {
        "type": "Company",
        "name": "Hims",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "63371595-93f3-42c2-aee8-2a487612d88e",
      "data": {
        "type": "Company",
        "name": "Outreach",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d1b77d5d-4980-4977-9643-f7a07aeb56cb",
      "data": {
        "type": "Company",
        "name": "Nxin (农信互联)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "0c3f88ab-94df-45da-b61d-821639fa58b6",
      "data": {
        "type": "Company",
        "name": "WalkMe",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8c8611ab-3cdb-476a-bbbf-56213fe68e60",
      "data": {
        "type": "Company",
        "name": "EBANX",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "9328691d-5b23-4133-b6f6-d7bd136b121c",
      "data": {
        "type": "Company",
        "name": "Grab",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7809f78c-59e8-4d30-9496-f7d16b416a3b",
      "data": {
        "type": "Company",
        "name": "Bolt",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "cd0ee637-6276-4fb1-8d0e-25fdf752fef8",
      "data": {
        "type": "Company",
        "name": "Airwallex",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c8fca5cb-4ee1-4495-bce4-2099095d0cb6",
      "data": {
        "type": "Company",
        "name": "Royole Corporation",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "a54e3c2a-8a65-469a-9f98-3a6b17a8baab",
      "data": {
        "type": "Company",
        "name": "BenevolentAI",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6b91a01d-dc70-44dd-8fa7-ad70058a9557",
      "data": {
        "type": "Company",
        "name": "Oyo Rooms",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7f538153-0ee0-4510-aaf5-3e7033b34517",
      "data": {
        "type": "Company",
        "name": "Global Switch",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "70629b79-6c8c-470d-8d50-40264b855ba7",
      "data": {
        "type": "Company",
        "name": "Yimidida",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e882080d-a396-438a-bb19-22913e709188",
      "data": {
        "type": "Company",
        "name": "Radius Payment Solutions",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c5ab9000-3f63-4397-aac3-acbbbcaeb90b",
      "data": {
        "type": "Company",
        "name": "GuaHao (We Doctor)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "4a7e4811-7c28-4a93-a54b-baca1bc83545",
      "data": {
        "type": "Company",
        "name": "VTS",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e22f44ff-036c-4134-8a6f-73bd1fdf0035",
      "data": {
        "type": "Company",
        "name": "GPClub",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9227406e-58ba-4133-a0ed-adccf128a9f0",
      "data": {
        "type": "Company",
        "name": "OakNorth",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d6821f01-a685-40ad-877f-e78c6221feab",
      "data": {
        "type": "Company",
        "name": "Zeta Global",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "a1ce2387-0537-4187-8df5-210d9e614adc",
      "data": {
        "type": "Company",
        "name": "OVO",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ddc4ec45-1167-4854-accb-781a268823d9",
      "data": {
        "type": "Company",
        "name": "Asana",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "14c15e25-cfc2-4ebd-a8ba-cb5956a0d721",
      "data": {
        "type": "Company",
        "name": "Rubicon Global",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "54fd9a1c-7382-4e3d-acc6-ad9c1b30811a",
      "data": {
        "type": "Company",
        "name": "BrewDog",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "ae25cb27-0e52-4daf-9519-3fe5729e79fd",
      "data": {
        "type": "Company",
        "name": "TalkDesk",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "f091bf9d-b5dc-44d4-acdd-4be427f7bffb",
      "data": {
        "type": "Company",
        "name": "Avant",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "23c4ac2e-b19e-47e4-855c-06a1c5af033a",
      "data": {
        "type": "Company",
        "name": "AppsFlyer",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "27cf78fb-32c0-49ed-995e-a1e79b0dda91",
      "data": {
        "type": "Company",
        "name": "Quanergy Systems",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "725dbd08-45c9-4cd8-bc80-e1a9d736f4f3",
      "data": {
        "type": "Company",
        "name": "Netskope",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d5dca4db-48f8-42e6-9cb1-38a90f516f1a",
      "data": {
        "type": "Company",
        "name": "Roblox",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "34f5c8af-56fa-4dbe-9343-6867aced0287",
      "data": {
        "type": "Company",
        "name": "KK Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e749af9a-e3bb-411e-a2d7-73593b9539da",
      "data": {
        "type": "Company",
        "name": "OpenDoor Labs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5ac07153-1805-4142-a9ff-753af0d12264",
      "data": {
        "type": "Company",
        "name": "Ola Electric Mobility",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "df3dd182-4c18-42a0-b812-1e6e13c5dc9e",
      "data": {
        "type": "Company",
        "name": "Zocdoc",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "f8eef965-3e1b-4341-b4cb-e074476e96fd",
      "data": {
        "type": "Company",
        "name": "Koudai",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "4e13fb8f-e809-43e9-9917-acb0c224bfb6",
      "data": {
        "type": "Company",
        "name": "OfferUp",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "87878d02-ce73-4ffb-b70e-ca63580c7f5e",
      "data": {
        "type": "Company",
        "name": "Soundhound",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "29944e63-5676-473d-8d43-7bf16ccf6d65",
      "data": {
        "type": "Company",
        "name": "iFood",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "31386d20-8d23-41d1-84ea-0b21be9fb782",
      "data": {
        "type": "Company",
        "name": "C2FO",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "29253ead-e415-423f-992b-c76cecd8cfec",
      "data": {
        "type": "Company",
        "name": "Infi",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "073af219-00cf-4101-b198-63571c1e4bdc",
      "data": {
        "type": "Company",
        "name": "Mia.com",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "760cdc88-18de-4fe1-afd8-04a9ab0f6388",
      "data": {
        "type": "Company",
        "name": "Hosjoy",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ef9babda-8826-4982-b057-3730298f9861",
      "data": {
        "type": "Company",
        "name": "Geek+",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "24524899-707d-477f-8b5c-27887b736fe5",
      "data": {
        "type": "Company",
        "name": "SpaceX",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5c1416bc-96e2-430c-9630-0808a1d8cdc3",
      "data": {
        "type": "Company",
        "name": "HashiCorp",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "039dc981-aad5-45bf-9d62-9f3bd307a687",
      "data": {
        "type": "Company",
        "name": "N26",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "89ce3789-0428-44da-9823-47897745615c",
      "data": {
        "type": "Company",
        "name": "BYJU'S",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "992a6b2e-897b-4e21-a729-e10547f22e3d",
      "data": {
        "type": "Company",
        "name": "Arrival",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "0df3ec7c-59f2-4efc-8e85-8005382cb248",
      "data": {
        "type": "Company",
        "name": "Vacasa",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ae4df9d2-9daf-4e79-93a2-2f9a36cf347c",
      "data": {
        "type": "Company",
        "name": "Flexport",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a4d8c09e-677a-44e8-a37b-dcbef16bdd5c",
      "data": {
        "type": "Company",
        "name": "Hike",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7bd352c4-7bb2-4af2-bc38-740c70f3b15b",
      "data": {
        "type": "Company",
        "name": "Rocket Lab",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d295f38d-45f8-4ece-be44-73d7b7706e6e",
      "data": {
        "type": "Company",
        "name": "Womai",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "717edc30-6901-47ed-9c4d-bab04cbf360e",
      "data": {
        "type": "Company",
        "name": "Promasidor Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "558b7f08-252c-414c-84fc-28519db57d04",
      "data": {
        "type": "Company",
        "name": "YITU Technology",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "8d989794-ac65-4d8e-bf23-8b573ed562e4",
      "data": {
        "type": "Company",
        "name": "Kuaishou",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e02cca10-c1d2-47fe-aa61-ae6e7cec1ef9",
      "data": {
        "type": "Company",
        "name": "Deliveroo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6c62a72e-1761-4e2d-9ae0-cf5bbb816dd6",
      "data": {
        "type": "Company",
        "name": "CGTZ",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0d92deb9-9942-46fd-9204-a3658ef998f1",
      "data": {
        "type": "Company",
        "name": "Wish",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c156bb21-e68b-4cb2-9427-2151b90f3788",
      "data": {
        "type": "Company",
        "name": "Banma Network Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b8bd8ba1-2105-4505-806e-48fb571f5c3e",
      "data": {
        "type": "Company",
        "name": "Unisound",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7baa42e4-a0eb-4ed6-84ec-3fbdbcf73985",
      "data": {
        "type": "Company",
        "name": "Zoox",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "100df992-d65d-4997-b64c-950d4c2a489b",
      "data": {
        "type": "Company",
        "name": "Zenefits",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "11ac3574-e189-453a-bb66-e6eae0c6e2d5",
      "data": {
        "type": "Company",
        "name": "Deposit Solutions",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "04665a92-f6d7-4a90-b570-1ec2cd0a999c",
      "data": {
        "type": "Company",
        "name": "Avaloq Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "40301944-5e3f-40fc-9345-e51e36153f4e",
      "data": {
        "type": "Company",
        "name": "Pony.ai",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "23669237-8c9a-42dc-a58a-bcf3a6554ce9",
      "data": {
        "type": "Company",
        "name": "Flywire",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c78a486c-88f8-4d48-90b5-18e98988909b",
      "data": {
        "type": "Company",
        "name": "Trendy Group International",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f8824bd0-99c2-40df-8db7-ff369547ead8",
      "data": {
        "type": "Company",
        "name": "Glossier",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "05c65a11-0ac2-4f11-b8a6-721382c2fea6",
      "data": {
        "type": "Company",
        "name": "Fanatics",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6bb462a1-7f17-4252-a78a-8f60e3e4e119",
      "data": {
        "type": "Company",
        "name": "Root Insurance",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8275b113-9006-4695-b890-94b88a84d76c",
      "data": {
        "type": "Company",
        "name": "Pendo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0b118eac-2158-4006-9017-1713c74894c9",
      "data": {
        "type": "Company",
        "name": "Greensill",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "8ef23456-4bae-4ea1-8adf-40d7d3917de7",
      "data": {
        "type": "Company",
        "name": "Otto Bock HealthCare",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "28817efc-f79b-407c-a95f-6f158f40a896",
      "data": {
        "type": "Company",
        "name": "Youxia Motors",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "c4cc767a-409d-4453-9121-38b916b19737",
      "data": {
        "type": "Company",
        "name": "Instacart",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "18503d5f-039e-4f1a-a3e3-230f53eb643a",
      "data": {
        "type": "Company",
        "name": "Yello Mobile",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1c0c3120-679c-4f69-9f8f-c5133083c49f",
      "data": {
        "type": "Company",
        "name": "KnowBox",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "dd0ef2b2-aa25-4b73-b4bf-bd39d85f692c",
      "data": {
        "type": "Company",
        "name": "Perfect Diary",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1e442c0f-d45f-491d-abaa-74c6c70203e1",
      "data": {
        "type": "Company",
        "name": "Kabbage",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "9daa4c6b-5db1-4ac2-92de-4b8bd1b26986",
      "data": {
        "type": "Company",
        "name": "Aprogen",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "ac6db081-a855-4ee0-9849-bf98526e9fbd",
      "data": {
        "type": "Company",
        "name": "Trax",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1d3df9a6-9559-4b2c-a85f-fbb50de75e2d",
      "data": {
        "type": "Company",
        "name": "Tresata",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ded40860-e90b-4c78-99fb-394a16fe7663",
      "data": {
        "type": "Company",
        "name": "Tujia",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "56c86f6d-3137-4960-b19d-1cd8e12e8030",
      "data": {
        "type": "Company",
        "name": "YH Global",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "05f62a6a-0283-4e9b-87ce-2b5700ac248e",
      "data": {
        "type": "Company",
        "name": "BigBasket",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a0e9da64-385d-42f1-820f-c5b485a392d2",
      "data": {
        "type": "Company",
        "name": "AvidXchange",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b7c687cc-c102-4c09-80d1-717a29244053",
      "data": {
        "type": "Company",
        "name": "Tuhu",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c656be36-f6a3-463a-83c3-3845f047f8c8",
      "data": {
        "type": "Company",
        "name": "Babylon Health",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "628738c8-d9f5-4c70-9422-581c498224c9",
      "data": {
        "type": "Company",
        "name": "Rivigo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e692c214-6f18-4efc-b928-a26642799957",
      "data": {
        "type": "Company",
        "name": "Momenta",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d65efd39-d28f-4b25-9ec5-be8fc8de6a35",
      "data": {
        "type": "Company",
        "name": "Guazi (Chehaoduo)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "a7dc7e54-627e-4282-bf8f-3f3bd6d68949",
      "data": {
        "type": "Company",
        "name": "Toast",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "255ac304-0cc0-460a-8e88-6f9ba726989c",
      "data": {
        "type": "Company",
        "name": "OutSystems",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c86f4057-87f0-4ceb-9789-6cbe191f6a1c",
      "data": {
        "type": "Company",
        "name": "Brex",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "cb10f260-d6b0-4083-8d0c-16c640856a59",
      "data": {
        "type": "Company",
        "name": "Illumio",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "af833b4c-4d1a-4d27-8c68-ececb90c954b",
      "data": {
        "type": "Company",
        "name": "TechStyle Fashion Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b7659cba-8d5e-462f-9ab3-347cb749738e",
      "data": {
        "type": "Company",
        "name": "HuJiang",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2ec83fd5-52fb-4570-adbb-0980e2c7b6df",
      "data": {
        "type": "Company",
        "name": "Checkout.com",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "5b145c92-d032-4fc6-9241-2136ccf2ada5",
      "data": {
        "type": "Company",
        "name": "Klook",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "4235532e-1f90-4222-b799-e50d25194326",
      "data": {
        "type": "Company",
        "name": "Tradeshift",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e40553d4-6795-46e8-88df-fd87d5a34a9f",
      "data": {
        "type": "Company",
        "name": "Argo AI",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "947354e7-3823-49c5-b5f1-e3609b465487",
      "data": {
        "type": "Company",
        "name": "Yixia",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "4b2af559-4907-437b-ac9d-987551e0fbd9",
      "data": {
        "type": "Company",
        "name": "MindMaze",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "70268c05-d9fe-46a3-96c6-de9feb674e06",
      "data": {
        "type": "Company",
        "name": "Ten-X",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "d522c613-39bc-48c5-8b27-3353de85dd89",
      "data": {
        "type": "Company",
        "name": "Indigo Agriculture",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "dcde9256-1808-4a5f-b8ba-23145edec619",
      "data": {
        "type": "Company",
        "name": "Supreme",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ee21cce0-bec3-42b6-9fb8-612868486015",
      "data": {
        "type": "Company",
        "name": "KeepTruckin",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a71e95f0-f2ba-45c7-99e5-dc6992fec770",
      "data": {
        "type": "Company",
        "name": "Squarespace",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c3fa8c85-a135-40cc-ae4a-54e0b14e02f5",
      "data": {
        "type": "Company",
        "name": "Zhihu",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "96c707a1-8786-4251-8f2f-bd9521479388",
      "data": {
        "type": "Company",
        "name": "Collibra",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "cc246627-5287-4a90-a205-b33e90f00ac7",
      "data": {
        "type": "Company",
        "name": "Aihuishou",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "00720838-b025-4303-93e6-04fc5cf9a930",
      "data": {
        "type": "Company",
        "name": "Hippo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3e27a5ac-efdc-4750-be3f-9d404ea9b31f",
      "data": {
        "type": "Company",
        "name": "Xinchao Media",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2c5e1cf7-4bba-47f8-b40d-1063adb3da74",
      "data": {
        "type": "Company",
        "name": "Airtable",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c70cee58-e586-420a-94cd-54adf1d8354f",
      "data": {
        "type": "Company",
        "name": "Huimin",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b3185787-caa5-4676-95ba-46375ca9c632",
      "data": {
        "type": "Company",
        "name": "Deezer",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "6b813296-10bc-4565-8bfc-0ec976a3e43f",
      "data": {
        "type": "Company",
        "name": "Scale AI",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "cdaa3396-2705-4691-a4f5-d20d8baf81a1",
      "data": {
        "type": "Company",
        "name": "Zipline International",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "9f0c50c6-1314-4186-8018-b667b804dc9d",
      "data": {
        "type": "Company",
        "name": "Ibotta",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0665f990-ccaf-4370-a952-85cc742f0a37",
      "data": {
        "type": "Company",
        "name": "Robinhood",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "f246f7bb-6de8-4f7e-a3e1-407e51da7dfe",
      "data": {
        "type": "Company",
        "name": "Coveo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6467f1c5-df8b-4dba-bd02-a7b41f7c6f87",
      "data": {
        "type": "Company",
        "name": "JUUL Labs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6dfd0047-961f-4611-9a5b-50c063d610f8",
      "data": {
        "type": "Company",
        "name": "ClassPass",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8f3d9027-7fd5-492b-9699-4bd54a3673fc",
      "data": {
        "type": "Company",
        "name": "Bitfury",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0a4e82da-b12f-4262-a6aa-3ae704d5715e",
      "data": {
        "type": "Company",
        "name": "Lenskart",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c0b732d7-388c-403d-b520-6858c5903bd4",
      "data": {
        "type": "Company",
        "name": "Niantic",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "b8aa0182-1afe-4bbd-b355-110264135f14",
      "data": {
        "type": "Company",
        "name": "Ginkgo BioWorks",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0fa174b0-5013-4d29-9fff-075ece5c72bf",
      "data": {
        "type": "Company",
        "name": "Lianjia (Homelink)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a9871e26-e730-4223-a4df-253910bd00d7",
      "data": {
        "type": "Company",
        "name": "Ding Xiang Yuan",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "12074389-c8ff-46c8-a9da-5b83ff9f5a13",
      "data": {
        "type": "Company",
        "name": "Improbable",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d97a60cf-a68e-484e-b170-d32f512e7f46",
      "data": {
        "type": "Company",
        "name": "Mu Sigma",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "ad754385-5639-4fd3-a940-1748bfda4be5",
      "data": {
        "type": "Company",
        "name": "Dave",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "dd20c501-68c6-4286-b957-d6b50b13b564",
      "data": {
        "type": "Company",
        "name": "Miaoshou Doctor",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "71340143-aef0-4ebf-8097-11095502fb3b",
      "data": {
        "type": "Company",
        "name": "Coocaa",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "e46b15af-34fb-4fa1-89fc-94a2d545e2e8",
      "data": {
        "type": "Company",
        "name": "Instabase",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e4f8bf1f-9c47-480c-b518-2cfbebc9abf5",
      "data": {
        "type": "Company",
        "name": "Confluent",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3afa66b2-48e5-4c62-8f54-455d27c92e95",
      "data": {
        "type": "Company",
        "name": "Infinidat",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "7bafeb7d-7115-448b-ae06-26a596892a94",
      "data": {
        "type": "Company",
        "name": "ZipRecruiter",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "efe79d93-c766-4477-8159-1c98bd95c771",
      "data": {
        "type": "Company",
        "name": "Intellifusion",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ed758ecd-534d-42aa-82b6-c0baf3a7d8b5",
      "data": {
        "type": "Company",
        "name": "Bird Rides",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e1b8a148-5b29-455a-8818-bb32214df335",
      "data": {
        "type": "Company",
        "name": "InMobi",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0d857b93-4164-43e4-8912-59d1e291f646",
      "data": {
        "type": "Company",
        "name": "Intercom",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "700163f4-7cfb-4bf4-a674-12f992fda1a1",
      "data": {
        "type": "Company",
        "name": "Postmates",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "50e8a9df-ae86-4349-8155-acfd0ee32e6c",
      "data": {
        "type": "Company",
        "name": "Didi Chuxing",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "21283757-946f-4825-9677-bfb93188f0ec",
      "data": {
        "type": "Company",
        "name": "Meizu Technology",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "6e503e88-d6f0-4db3-a8a3-4ed4e09a631d",
      "data": {
        "type": "Company",
        "name": "Warby Parker",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0b235399-a2b0-44a9-aeab-2b643c2875f0",
      "data": {
        "type": "Company",
        "name": "Snyk",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c909d0d7-1b1e-4369-816c-5de352b60e77",
      "data": {
        "type": "Company",
        "name": "Viva Republica (Toss)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c19273ea-02a2-458d-bc70-684d1f30d4f2",
      "data": {
        "type": "Company",
        "name": "Druva",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "f1ba8142-9743-4118-bfd0-01a778dc3c59",
      "data": {
        "type": "Company",
        "name": "China Cloud",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "82909e6a-57a2-45e9-99c0-3cb0ad654e49",
      "data": {
        "type": "Company",
        "name": "Cloudwalk",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "2dffe4c4-85fc-45cf-857c-4088853f1fcf",
      "data": {
        "type": "Company",
        "name": "Discord",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8b17424b-eeff-4098-b8f7-7dfb58a681da",
      "data": {
        "type": "Company",
        "name": "TripActions",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ee3db34d-60b2-462a-9ef9-5d659fa2fe08",
      "data": {
        "type": "Company",
        "name": "DJI Innovations",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "6c427ae4-b5fb-4b5d-a4fa-832a9865faf6",
      "data": {
        "type": "Company",
        "name": "Knotel",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "fe67d5dd-86f1-4eaa-9a2b-4091c57b63b5",
      "data": {
        "type": "Company",
        "name": "Pine Labs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b1f572eb-a2c4-4f90-87a4-112e5fcb1a0c",
      "data": {
        "type": "Company",
        "name": "Jiuxian",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "635d0a41-d36b-4a03-a9fa-e96da257aec4",
      "data": {
        "type": "Company",
        "name": "Ovo Energy",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "324d6dab-41c0-4e79-a336-a2936d7d414a",
      "data": {
        "type": "Company",
        "name": "UBTECH Robotics",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "9488e791-1fc4-4f54-824d-61465a0dbbf6",
      "data": {
        "type": "Company",
        "name": "Ripple",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "3b54eec3-ecd9-4ddd-8ae6-ce99d9cef97e",
      "data": {
        "type": "Company",
        "name": "Mofang Living",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "92b38b45-2e54-47d5-bbce-f307757fa3a7",
      "data": {
        "type": "Company",
        "name": "Seismic",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b8ba72e8-0aaf-4d4e-a8e6-60720f3b38b7",
      "data": {
        "type": "Company",
        "name": "Houzz",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7ebc4dc1-acc6-4f26-9c83-2df3a38d4747",
      "data": {
        "type": "Company",
        "name": "Beike Zhaofang",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "84ca26ce-4766-44fc-812e-c1d0bc3e897b",
      "data": {
        "type": "Company",
        "name": "Yijiupi (易久批)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "fda96335-e82e-4ee6-a6e6-91b140cd05e6",
      "data": {
        "type": "Company",
        "name": "EasyHome",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "bbed86e7-d143-44f3-ad00-73ae341ee190",
      "data": {
        "type": "Company",
        "name": "Buzzfeed",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6602c36e-f371-4b04-b662-000a779f0e65",
      "data": {
        "type": "Company",
        "name": "Lookout",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8a4ed064-fcbb-4073-855c-a84480a2204d",
      "data": {
        "type": "Company",
        "name": "Kujiale",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "59ffe682-19c2-4ed1-afa9-5b8f006310fe",
      "data": {
        "type": "Company",
        "name": "Acronis",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "9a8831d2-813b-4703-ab0b-5948f6b4af46",
      "data": {
        "type": "Company",
        "name": "BeiBei",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "d2bbc6f3-8c7e-444a-b7c6-31f8a1ac4470",
      "data": {
        "type": "Company",
        "name": "Coinbase",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "bf341a3d-326f-4564-a118-5efe79f53e19",
      "data": {
        "type": "Company",
        "name": "Linklogis",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "8d12c06c-d905-4bd5-882d-f1080c630e66",
      "data": {
        "type": "Company",
        "name": "Lixiang Automotive",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "33da5625-37e9-4969-9a53-0507ca2d21ba",
      "data": {
        "type": "Company",
        "name": "Yiguo (易果生鲜)",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "2354048b-7f8f-4bf1-b11b-1a022e2cf4c8",
      "data": {
        "type": "Company",
        "name": "OrCam Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "13acb4b1-84a9-4f3b-a889-9695bdd2f5bb",
      "data": {
        "type": "Company",
        "name": "Intarcia Therapeutics",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "7d9d50fa-740e-41bf-ab37-b961edde7ac4",
      "data": {
        "type": "Company",
        "name": "Clover Health",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "fd5cafaa-6c73-4259-9503-0f348649a3a1",
      "data": {
        "type": "Company",
        "name": "InVision",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "42ad8250-8d9e-4345-9314-dffb5f15c396",
      "data": {
        "type": "Company",
        "name": "MarkLogic",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "1bdef672-51a4-4803-954f-ac9e4765e7fe",
      "data": {
        "type": "Company",
        "name": "Chime",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b8991063-636b-463c-aff6-1185836eddda",
      "data": {
        "type": "Company",
        "name": "FirstCry",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "a75966b0-cef0-4fe8-a203-06b0d5f0ff2a",
      "data": {
        "type": "Company",
        "name": "Freshworks",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "245efb30-585d-4897-b792-cbe1549fd9bd",
      "data": {
        "type": "Company",
        "name": "reddit",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "26dd0c26-a0cb-4aba-b1f9-c287ca9782de",
      "data": {
        "type": "Investor",
        "name": "Essence Financial",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b3973712-8bec-4305-9b8f-84d1dbc1276e",
      "data": {
        "type": "Investor",
        "name": "BPI France",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "bf188921-bad1-4513-8ff7-edf2a0f9f7da",
      "data": {
        "type": "Investor",
        "name": "Unternehmertum Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7842b310-6cd5-4c01-a231-cc02e0e3039f",
      "data": {
        "type": "Investor",
        "name": "Softbank Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c8d224f1-2d64-4b96-af78-ae896333c47a",
      "data": {
        "type": "Investor",
        "name": "Composite Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "320ca84c-b4e8-4446-96e2-43afb5529266",
      "data": {
        "type": "Investor",
        "name": "Susquehanna Growth Equity",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "51a63389-6409-461a-a76e-51cce1061364",
      "data": {
        "type": "Investor",
        "name": "Founder H Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "83f7671c-6ba4-4474-82ab-f809495b15fe",
      "data": {
        "type": "Investor",
        "name": "U.S.-China Green Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d57ba9ab-7ea0-4d62-881d-99a9b91ec15c",
      "data": {
        "type": "Investor",
        "name": "Naspers",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "310009be-6230-459f-a972-fd192f144554",
      "data": {
        "type": "Investor",
        "name": "Ironbridge Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c5a6486b-a6a7-4f0a-98e9-de54345dd37d",
      "data": {
        "type": "Investor",
        "name": "Volkswagen",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9b0de91a-8766-437d-a72f-a06e2d88853c",
      "data": {
        "type": "Investor",
        "name": "TPG Growth",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "e91b3a99-b75a-4c28-b57a-a37c503bb5be",
      "data": {
        "type": "Investor",
        "name": "Seedcamp",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "d5e07e50-58f4-459d-9c4a-c9e1cbad9865",
      "data": {
        "type": "Investor",
        "name": "Sapphire Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8d45ca2b-6758-4d50-bf2b-8e0aa96e102e",
      "data": {
        "type": "Investor",
        "name": "IDG Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "d409d291-5c9b-425a-b908-e1415007eb89",
      "data": {
        "type": "Investor",
        "name": "Zhenghedao Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4ef3e1dc-1337-4bdc-b611-284216966c1e",
      "data": {
        "type": "Investor",
        "name": "Bloomberg Beta",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "8516cf43-1869-4fad-8eb1-7c95113e9b9d",
      "data": {
        "type": "Investor",
        "name": "Australian Future Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f4cbf489-1440-41ba-b6e1-59317fa893c8",
      "data": {
        "type": "Investor",
        "name": "Legend Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2e36a227-3dec-456a-b4a7-e73ecc64beba",
      "data": {
        "type": "Investor",
        "name": "Makena Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c08ae974-5452-490e-9ac6-97a5fcd4bb91",
      "data": {
        "type": "Investor",
        "name": "Bain Capital Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "532e502c-6505-4af4-b280-37dd3a4b44a7",
      "data": {
        "type": "Investor",
        "name": "Eli Lilly & Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c98a7b47-b365-4771-bcd3-356394c28a22",
      "data": {
        "type": "Investor",
        "name": "Google Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "643be748-f49b-47f6-8ea1-bfecb4fed4d9",
      "data": {
        "type": "Investor",
        "name": "Guangzhou Huiyin Aofeng Equity Investment Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "13b08a7e-30b1-429e-a705-325902e750b5",
      "data": {
        "type": "Investor",
        "name": "Diamler",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e4129388-168d-40e1-92c0-8b1b197fe13e",
      "data": {
        "type": "Investor",
        "name": "Lockheed Martin",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6f73f564-6877-48ae-b8c2-e278f65f9736",
      "data": {
        "type": "Investor",
        "name": "Tokopedia",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "baa0c5c2-9de2-49da-b58f-d0274a48ab60",
      "data": {
        "type": "Investor",
        "name": "Far East Horizon",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1ce973c3-4975-4c4f-9282-eedf8d5b91af",
      "data": {
        "type": "Investor",
        "name": "Tribeca Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "226df2a8-4481-498d-bac1-4a9b3c29b100",
      "data": {
        "type": "Investor",
        "name": "QiMing Venture Partnersl",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2aa7b476-a577-43a2-87cd-b085b6725503",
      "data": {
        "type": "Investor",
        "name": "Zheshang Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8245e903-41fd-4a7a-af27-6d61bef4b6ea",
      "data": {
        "type": "Investor",
        "name": "Holtzbrinck Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c434fb5c-844d-4e75-8ec5-12ad13d1d88f",
      "data": {
        "type": "Investor",
        "name": "LGT Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8dd2f1c4-9b6b-4a8c-9953-4376366fc2d1",
      "data": {
        "type": "Investor",
        "name": "CDIB Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "656db700-75c3-4d6e-8215-c09e399d579a",
      "data": {
        "type": "Investor",
        "name": "Mithril",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "85121e7d-ab1c-4602-a387-660417b24fc3",
      "data": {
        "type": "Investor",
        "name": "Homebrew",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5ecdef1c-12da-44b5-800a-7528645cf191",
      "data": {
        "type": "Investor",
        "name": "Elephant Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b712c5ff-4a42-448c-9609-926d719b831d",
      "data": {
        "type": "Investor",
        "name": "TowerBrook Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e5616e79-e606-4617-ab83-688a4a1694dc",
      "data": {
        "type": "Investor",
        "name": "Fidelity Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d171efb6-90a2-4188-8afa-8cd98736269f",
      "data": {
        "type": "Investor",
        "name": "T. Rowe Price",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "933fc378-2d4e-48b2-a457-56fb9e2aa341",
      "data": {
        "type": "Investor",
        "name": "Zeev Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "a341b3cd-84c9-41aa-94d4-ac423cf789e8",
      "data": {
        "type": "Investor",
        "name": "Delphi Automotive",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8452224f-70fb-4c62-bdf9-5639ec2dd883",
      "data": {
        "type": "Investor",
        "name": "Singapore Wealth Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "94bc1030-436f-4840-a79a-d0b50ab87ec2",
      "data": {
        "type": "Investor",
        "name": "Goldman Sachs",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 16
      }
    },
    {
      "id": "06d45aa4-40e3-4ae1-9a57-24ce48ff05ad",
      "data": {
        "type": "Investor",
        "name": "Citi Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f24375d1-fc3a-4d12-9722-4ef00674e913",
      "data": {
        "type": "Investor",
        "name": "Bitmain Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d5d3449e-6007-4970-9301-95e78c83a60c",
      "data": {
        "type": "Investor",
        "name": "Breyer Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "12aa6338-1a46-4aa0-9329-0bc456f5b431",
      "data": {
        "type": "Investor",
        "name": "Digital Currency Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "19a7a140-b6e9-4b67-962c-47e03263fdbd",
      "data": {
        "type": "Investor",
        "name": "Wanxin Media",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "08f4f061-0650-4739-8a74-cec7ce312bfd",
      "data": {
        "type": "Investor",
        "name": "Intel Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "c15578c2-53e7-478f-a71f-a9a797a9a667",
      "data": {
        "type": "Investor",
        "name": "OMERS Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "756bd408-94ae-4e49-be18-cd1438d3cd96",
      "data": {
        "type": "Investor",
        "name": "German Media Pool",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "50370ece-3841-41eb-b90a-1c827e160dd5",
      "data": {
        "type": "Investor",
        "name": "Structure Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "413c4049-f6fe-41e3-94a8-b4be02ad64f2",
      "data": {
        "type": "Investor",
        "name": "Mayfair Equity Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d4e523ed-b9a3-434f-b93a-2e98466b5d8e",
      "data": {
        "type": "Investor",
        "name": "Coltrane Asset Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "eb69936b-6160-4729-bfd7-17b1b404ab5b",
      "data": {
        "type": "Investor",
        "name": "Microsoft Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9d2e9acf-abfe-4bec-ae74-11540bc4f253",
      "data": {
        "type": "Investor",
        "name": "Index Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 9
      }
    },
    {
      "id": "2fba25a7-5484-432b-8ee4-4336a24c6719",
      "data": {
        "type": "Investor",
        "name": "GSV Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f937952d-470e-42ee-8ea9-43352efd8f3c",
      "data": {
        "type": "Investor",
        "name": "Boxin Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9411180f-98f1-47ff-a7c2-9a839b02200d",
      "data": {
        "type": "Investor",
        "name": "Beijing Juneng Hesheng Industry Investment Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4c04b02f-f614-4ea7-8192-14be736ab9f0",
      "data": {
        "type": "Investor",
        "name": "Charlotte Angel Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "46dd3259-91c5-4bbc-aa7a-b6a55275800f",
      "data": {
        "type": "Investor",
        "name": "Wellington Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "7a0b02ab-0b14-4406-b83b-628a0c8825f7",
      "data": {
        "type": "Investor",
        "name": "IA Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "452fe423-31ff-4f1b-95f0-c42392c50adb",
      "data": {
        "type": "Investor",
        "name": "Pritzker Group Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e0aa307f-ea3a-4da9-8003-377f38eab1b5",
      "data": {
        "type": "Investor",
        "name": "Greylock Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 11
      }
    },
    {
      "id": "b56af550-6226-455b-9651-70dae0213f23",
      "data": {
        "type": "Investor",
        "name": "Lakestar",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "fa66e6c9-8df4-4ce1-a74f-1bb9134906c2",
      "data": {
        "type": "Investor",
        "name": " Institutional Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5ffc3a26-c321-4ad7-94a8-67984ee231f0",
      "data": {
        "type": "Investor",
        "name": "Sequoia Capital China",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 25
      }
    },
    {
      "id": "c651561f-d9aa-46ea-ab93-d3c5f93e409a",
      "data": {
        "type": "Investor",
        "name": "Neuberger Berman",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6a92d323-ef92-4164-a40b-4b0f370cf88f",
      "data": {
        "type": "Investor",
        "name": "Shougang Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3930034d-a6d8-4173-9177-b4b4320b0620",
      "data": {
        "type": "Investor",
        "name": "CRV",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "fb158f0d-bff9-4e34-bc1a-6ab38e24275c",
      "data": {
        "type": "Investor",
        "name": "Quantum Energy Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2710889a-1660-4480-b2a2-679389bfd50f",
      "data": {
        "type": "Investor",
        "name": "ARCH Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9e43ba68-5400-447a-888d-cf1aa482346d",
      "data": {
        "type": "Investor",
        "name": "Foresite Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "044fe15f-c9f7-472b-acea-1eb755a5a887",
      "data": {
        "type": "Investor",
        "name": "Gopher Asset Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b8bbe68e-f235-461a-91e3-2fa454f82749",
      "data": {
        "type": "Investor",
        "name": "Red Sea Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "37870f2d-ed7e-4298-a699-15c2f49d5312",
      "data": {
        "type": "Investor",
        "name": "TSG Consumer Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "06c86ca9-e2e2-4992-8767-6f62816935fe",
      "data": {
        "type": "Investor",
        "name": "Vision Plus Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "18185970-49a1-4415-89ef-a5e7148ec804",
      "data": {
        "type": "Investor",
        "name": "ICONIQ Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 7
      }
    },
    {
      "id": "f514ee14-2820-433d-ad28-025bc10d471a",
      "data": {
        "type": "Investor",
        "name": "DN Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c7ca8b19-1dc0-4195-9883-fb3e678444d5",
      "data": {
        "type": "Investor",
        "name": "Zhiping Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "573412c4-f959-4134-9529-1bb6ed37d87e",
      "data": {
        "type": "Investor",
        "name": "LBBW Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4a943b9c-d113-4aa8-969f-9bd2173b4544",
      "data": {
        "type": "Investor",
        "name": "GE Healthcare",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "92138297-f7fb-469d-bd2c-9b2aa2fb15e2",
      "data": {
        "type": "Investor",
        "name": "Earlybrid Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9f93b521-442f-4723-91af-693c4abf929a",
      "data": {
        "type": "Investor",
        "name": "AID Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6cd3e988-6c54-41f4-a2e1-5671581c33a4",
      "data": {
        "type": "Investor",
        "name": "Basepoint Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c1ebdcec-e6e7-4961-8eea-62180d892916",
      "data": {
        "type": "Investor",
        "name": "Contour Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "99a18d98-36b5-46fc-8f0b-20507484e76e",
      "data": {
        "type": "Investor",
        "name": "R-Z Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a385b082-aeda-45ca-b0bb-eb8b0073d8b2",
      "data": {
        "type": "Investor",
        "name": "Nintendo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "54634c49-3f72-4b90-b2a7-97b52b036253",
      "data": {
        "type": "Investor",
        "name": "IKEA GreenTech",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f48e1220-1352-42c4-bdcb-cc91e02b7640",
      "data": {
        "type": "Investor",
        "name": "Trinity Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "0f31cfdb-4a6a-4235-95ec-cd5ba3f0e4d8",
      "data": {
        "type": "Investor",
        "name": "Core Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8",
      "data": {
        "type": "Investor",
        "name": "GGV Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 8
      }
    },
    {
      "id": "f573b41f-ff75-43a0-96d3-2ec5fafd8638",
      "data": {
        "type": "Investor",
        "name": "DAG Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "db76de8a-63eb-4342-bd62-860da9170520",
      "data": {
        "type": "Investor",
        "name": "Revolution",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "e03458ed-c552-4beb-ad53-a4bcfb6c7911",
      "data": {
        "type": "Investor",
        "name": "Western Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "02fae527-fd37-463c-a7c6-3498a3402403",
      "data": {
        "type": "Investor",
        "name": "Lightspeed India Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "49961b16-94c9-441e-9b98-5e30a3c1838f",
      "data": {
        "type": "Investor",
        "name": "Seaya Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "48cd1ac6-d95a-4a36-bf3d-398f93a07914",
      "data": {
        "type": "Investor",
        "name": "EQT Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c450c06b-eca2-467f-b69d-3ad19b188be6",
      "data": {
        "type": "Investor",
        "name": "Mitsubishi Corporation",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "993eb1fd-8279-42e2-857c-988b0036c964",
      "data": {
        "type": "Investor",
        "name": "CITIC Securities International",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e1c48b9d-9097-4e4e-a27c-78754ba6a440",
      "data": {
        "type": "Investor",
        "name": "Target Global",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fd9b2f74-1bd4-4949-b512-a84e08f776dc",
      "data": {
        "type": "Investor",
        "name": "Draper Fisher Jurvetson",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "07ea41f4-dbfc-4f98-9fbb-4feb033ae915",
      "data": {
        "type": "Investor",
        "name": "Formation8",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6ba54370-81c5-41ee-9f84-1d560ba22815",
      "data": {
        "type": "Investor",
        "name": "and Sequoia Capital China",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "aff1079c-9101-4d45-8ed2-10ebea13c140",
      "data": {
        "type": "Investor",
        "name": "Section 32",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3096e853-f9a6-4910-aa52-d2dd504d763b",
      "data": {
        "type": "Investor",
        "name": "Aeris Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d0bd1867-e7f0-4d97-9f18-63598e8da809",
      "data": {
        "type": "Investor",
        "name": "Banyan Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "d95bf98c-1c20-4d3a-b335-7c1e049d3cc8",
      "data": {
        "type": "Investor",
        "name": "Newmark Knight Frank",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "69ca94a2-1703-4e64-8356-f2c750e23f90",
      "data": {
        "type": "Investor",
        "name": "Sina Weibo Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "780831ae-1133-4680-9175-0dddbec92c3a",
      "data": {
        "type": "Investor",
        "name": "Hongxiu VC",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "01acd508-0789-4d70-84b0-53e62aa7c291",
      "data": {
        "type": "Investor",
        "name": "IDInvest Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6ac5c52d-be33-45f2-8be6-c0de9011de32",
      "data": {
        "type": "Investor",
        "name": "Durable Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "cbb75c09-3bdf-4164-9e98-5a6c9830fa86",
      "data": {
        "type": "Investor",
        "name": "Foxconn",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f8dca991-48d3-4dae-a84e-1f4e6b7c4206",
      "data": {
        "type": "Investor",
        "name": "DFJ Growth",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "7be3c93d-c7dd-4629-9b48-a9c51cc12692",
      "data": {
        "type": "Investor",
        "name": "AME Cloud Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4479fa89-5234-4046-9332-e44d4f567a9d",
      "data": {
        "type": "Investor",
        "name": "Vertex Venture Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0d52054e-772e-407b-b9da-2bcb7db06d90",
      "data": {
        "type": "Investor",
        "name": "Endeavor",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "27590593-7b7b-4aa0-a0b7-1ce7a5fbba7c",
      "data": {
        "type": "Investor",
        "name": "RPM Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1ac8d82e-e246-40f2-ae77-9857c40a1614",
      "data": {
        "type": "Investor",
        "name": "Warmsun Holding",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ba545ef3-5f98-4872-9496-e69727318b38",
      "data": {
        "type": "Investor",
        "name": "Crosslink Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7a01b840-8316-46a6-957d-08f4bd3815b7",
      "data": {
        "type": "Investor",
        "name": "Aviation Industry Corporation of China",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "876c3586-b34f-4f7c-bd4b-f49c425b7be3",
      "data": {
        "type": "Investor",
        "name": "Venrock",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "78803f17-efde-4187-be9a-8e7eb8b4b2bd",
      "data": {
        "type": "Investor",
        "name": "Alibaba Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 13
      }
    },
    {
      "id": "6d6f8373-90d3-449f-a054-7013b3e49895",
      "data": {
        "type": "Investor",
        "name": "Richland Equities",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a64329ed-fbb4-4792-9a63-261f701e2d8c",
      "data": {
        "type": "Investor",
        "name": "FANUC",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0b80d411-b7a1-4a97-aaa8-6361ad25dc3c",
      "data": {
        "type": "Investor",
        "name": "K2 Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "a2e8a795-b38c-4cdf-8719-c7d7121f9b57",
      "data": {
        "type": "Investor",
        "name": "Sutter Hill Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf",
      "data": {
        "type": "Investor",
        "name": "Qiming Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 9
      }
    },
    {
      "id": "8dc446c8-7907-4d91-bbce-dfb7b35c0855",
      "data": {
        "type": "Investor",
        "name": "China Health Industry Investment Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f2f28542-08df-4582-8fc8-0250d4f18345",
      "data": {
        "type": "Investor",
        "name": "Draper Fisher Jurtson",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "cdcf10af-6671-4720-9a23-ae6d17d87aee",
      "data": {
        "type": "Investor",
        "name": "Capital Today",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "45aa74e3-6830-43ad-b349-3bcb98edd8a9",
      "data": {
        "type": "Investor",
        "name": "China Everbright Investment Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a0cd6d85-08c7-4a60-9345-b218a95fb9db",
      "data": {
        "type": "Investor",
        "name": "Social Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "69b746f5-69c2-45b9-be70-619c04e9a6c8",
      "data": {
        "type": "Investor",
        "name": "K1 Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "bf7db85a-a032-476c-a8c7-594db8abce57",
      "data": {
        "type": "Investor",
        "name": "CPP Investment Board",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "15b53dfd-0e5b-4a16-8879-1a9f3129cb08",
      "data": {
        "type": "Investor",
        "name": "Ping An Insurance",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "56f75a91-1059-4006-9d3a-dba5489b6cec",
      "data": {
        "type": "Investor",
        "name": "China Investment Corporation",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6b05240f-8643-49ec-8de4-8f95950deae1",
      "data": {
        "type": "Investor",
        "name": "Infore Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d1fb7e7d-8bb7-4a3f-baf9-70ab3fb740de",
      "data": {
        "type": "Investor",
        "name": "Zhongrong International Trust",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b68fa715-f849-45ad-96af-679a5d7dd4b3",
      "data": {
        "type": "Investor",
        "name": "Genesis Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "e91b6b4a-ab12-47b3-ac2d-53effca5c7cc",
      "data": {
        "type": "Investor",
        "name": "Kia Motors Company",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2a9b56ff-d320-4026-b935-f0b6f061626a",
      "data": {
        "type": "Investor",
        "name": "Shanghai Puyin Industry",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b6c6d64d-bef9-4487-9279-a2b02b2e1ae5",
      "data": {
        "type": "Investor",
        "name": "Net1 UEPS Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "85a8fec3-a8a2-4fbb-8c87-34b7c2bf15f1",
      "data": {
        "type": "Investor",
        "name": "Centralway",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0dde9f21-3c32-42d5-9f9e-b61b6fa6336f",
      "data": {
        "type": "Investor",
        "name": "Aviv Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c1505a80-1132-4fc2-8e9e-1f7cbbad9054",
      "data": {
        "type": "Investor",
        "name": "Japan Post Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "df176b7b-4de4-4475-b4be-10f59cd147e8",
      "data": {
        "type": "Investor",
        "name": "iTech Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5e8977da-39d2-4b7c-b99e-44d84797b860",
      "data": {
        "type": "Investor",
        "name": "SignalFire",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "267903d7-1323-483d-baf8-d49acfc02d0c",
      "data": {
        "type": "Investor",
        "name": "DFJ Growth Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "aecf9e19-6ccf-4ba1-a1dd-6140ed5641e0",
      "data": {
        "type": "Investor",
        "name": "GE Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "994114a6-f1fd-4903-82c1-12f112acd73e",
      "data": {
        "type": "Investor",
        "name": "Obvious Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6e25937d-8ca4-4e2b-8037-b27d23678a2e",
      "data": {
        "type": "Investor",
        "name": "VebVentures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "71616517-5333-4ed1-8e8d-55c182f7dec1",
      "data": {
        "type": "Investor",
        "name": "Technology Crossover Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "a419741c-5b88-414a-bd4b-b8a7d3f192bc",
      "data": {
        "type": "Investor",
        "name": "8VC",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "01e49e65-8f8c-40ec-81b5-5a2e596f06f3",
      "data": {
        "type": "Investor",
        "name": "Atlos Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "546270a5-e187-40ac-916b-20314d6a1fbe",
      "data": {
        "type": "Investor",
        "name": "GSO Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "81be3714-dc51-472a-a90b-c5804aeffe16",
      "data": {
        "type": "Investor",
        "name": "next47",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e739db6c-a980-42a9-b1ec-2fcb8212b5c8",
      "data": {
        "type": "Investor",
        "name": "Borui Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "dc5d05ec-f95d-4cd3-b159-b9e748125739",
      "data": {
        "type": "Investor",
        "name": "CJ ENM",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c129d99d-8733-45da-9e84-09bc9d45b2e7",
      "data": {
        "type": "Investor",
        "name": "In-Q-Tel",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "75df8751-561f-421d-b5f3-0cf8c5977fcb",
      "data": {
        "type": "Investor",
        "name": "Tencent",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 7
      }
    },
    {
      "id": "aba0af96-afcc-4c49-998c-bc5a1d1b32e0",
      "data": {
        "type": "Investor",
        "name": "Morningside Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a0aeffd1-c6d5-4211-9b3f-c2af1c407d94",
      "data": {
        "type": "Investor",
        "name": "Fifth Wall Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7c9dc09e-3195-457b-878d-066cde649e0c",
      "data": {
        "type": "Investor",
        "name": "Burda Principal Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "754133ee-4dc2-44e1-9028-d6048f6fafde",
      "data": {
        "type": "Investor",
        "name": "Illumina",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "11539712-ab04-4bf2-b2ed-a241f352d98f",
      "data": {
        "type": "Investor",
        "name": "Collaborative Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "48030f5c-60e6-4718-b84d-7a54f3fc34cc",
      "data": {
        "type": "Investor",
        "name": "Crowdcube",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "aec19484-ed34-428a-8e41-6db55cb185af",
      "data": {
        "type": "Investor",
        "name": "Global Asset Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "968bc5c4-ed19-4657-a9a2-e20cfbb645be",
      "data": {
        "type": "Investor",
        "name": "Hopu Investment Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "4ed0c851-0ff2-49f8-8d65-422270f575ce",
      "data": {
        "type": "Investor",
        "name": "Morningside Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "95a6f791-b6d9-4002-8173-cf009650dad7",
      "data": {
        "type": "Investor",
        "name": "Digital Sky Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "33f94cec-32a6-4780-bf6f-8ef54226d846",
      "data": {
        "type": "Investor",
        "name": "Ford Motor Company",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3efc82eb-0afe-40eb-ba07-0bdd08c2bc16",
      "data": {
        "type": "Investor",
        "name": "Highland Europe",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f612f131-c821-4c79-873b-cc14e9a44981",
      "data": {
        "type": "Investor",
        "name": "Artemis Investment Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a379ad3b-1b96-4602-80c0-f0ae5144a183",
      "data": {
        "type": "Investor",
        "name": "Rich Land Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e0afae04-e13d-4216-a0ee-7d50a16a4e10",
      "data": {
        "type": "Investor",
        "name": "BBVA",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5379fa02-25e4-4971-b918-861e9c0f66de",
      "data": {
        "type": "Investor",
        "name": "Green Pine Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "06eb85c6-e6e9-49f8-beb7-d081a86d3a5a",
      "data": {
        "type": "Investor",
        "name": "US Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "65b1e8cf-65a2-4d4b-b064-3b945810207c",
      "data": {
        "type": "Investor",
        "name": "Caisse de depot et placement du Quebec",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d3a831e6-b684-45f5-b96c-da45411236fe",
      "data": {
        "type": "Investor",
        "name": "Alibaba Pictures Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "345427ed-6be5-4bec-8064-7f648f8786f1",
      "data": {
        "type": "Investor",
        "name": "L Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ce9073ae-da01-4172-8e1d-482f86207ffe",
      "data": {
        "type": "Investor",
        "name": "TopoScend Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b97f3ec2-ceca-42bc-b1aa-ae582b17f352",
      "data": {
        "type": "Investor",
        "name": "SDIC Innovation Investment Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "736c2c7a-3e0b-4f23-8bc7-479e9f1b0208",
      "data": {
        "type": "Investor",
        "name": "Giza Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d8c8ca68-5078-4193-9a89-179ed2b4a933",
      "data": {
        "type": "Investor",
        "name": "RRE Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "106e349b-7453-4eef-bfdf-50970a77876b",
      "data": {
        "type": "Investor",
        "name": "Warburg Pincus",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 7
      }
    },
    {
      "id": "da11af46-c3c9-4c30-b8f3-29c543d16563",
      "data": {
        "type": "Investor",
        "name": "Tiger Global",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "92e3a8fd-fb1a-4a28-b353-3ad235a33289",
      "data": {
        "type": "Investor",
        "name": "Cowboy Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fc6e9f53-b7a9-4e53-bdcd-94bc632ab142",
      "data": {
        "type": "Investor",
        "name": "Emtek Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "07cbec61-039f-46a3-b08a-4ffd43e32d3e",
      "data": {
        "type": "Investor",
        "name": "Otter Rock Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1be83cb9-756e-4ea3-8c46-6c6d18d3a9cd",
      "data": {
        "type": "Investor",
        "name": "Stone Point Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0b59666d-00e6-4aba-aca4-deb8e6b94e2d",
      "data": {
        "type": "Investor",
        "name": "Tokyo Century Corporation",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6ac40bcd-2d84-47a4-8d67-fd864f458672",
      "data": {
        "type": "Investor",
        "name": "Cox Automotive",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9aac7248-089a-4399-b377-88d938712ad7",
      "data": {
        "type": "Investor",
        "name": "Gaorong Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "bd6d23ea-967c-4dfc-95b8-fa7e0ce73ff8",
      "data": {
        "type": "Investor",
        "name": "BlueCross BlueShield Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5f777aa5-3f38-4bfb-bc2b-3f61f7ac2254",
      "data": {
        "type": "Investor",
        "name": "Partners Investment",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "83e30b4e-9ff5-43c0-a1c0-510df00fb626",
      "data": {
        "type": "Investor",
        "name": "BOC International",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2d382f1f-4ab9-48d0-888d-c0220ca20e3e",
      "data": {
        "type": "Investor",
        "name": "Hony Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "12417911-45d7-481f-9704-529f4d299714",
      "data": {
        "type": "Investor",
        "name": "Shunwei Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "cd00bcb1-b2bb-401f-9fb7-0bbcf1ecb573",
      "data": {
        "type": "Investor",
        "name": "iGlobe Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a8944eaf-1332-42ff-b295-52276c71439a",
      "data": {
        "type": "Investor",
        "name": "IMM Investment",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2",
      "data": {
        "type": "Investor",
        "name": "Tencent Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 21
      }
    },
    {
      "id": "4fddc9c9-b3b5-4607-ab31-c7cd9f1701a7",
      "data": {
        "type": "Investor",
        "name": "Zhangjiang Haocheng Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5db8ac29-7417-4c88-8b5f-655b39cfc8eb",
      "data": {
        "type": "Investor",
        "name": "J.P. Morgan Chase & Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "888fd0d8-9ddb-4db6-8e0c-5acdcfe30738",
      "data": {
        "type": "Investor",
        "name": "Summit Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9c2fba52-3119-4dcf-8a16-37d75ecbb24b",
      "data": {
        "type": "Investor",
        "name": "F-Prime Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "e4e2f884-8f9e-4811-82a5-281654bd3579",
      "data": {
        "type": "Investor",
        "name": "Gemini Israel Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "463847b0-d002-45a5-a7aa-c2178b0a2291",
      "data": {
        "type": "Investor",
        "name": "Shanghai Electric Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0f8344ba-499a-4d33-abc0-cfc10f4b2050",
      "data": {
        "type": "Investor",
        "name": "Upfront Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d6ef77b3-de75-4a74-919d-690a412ab9e2",
      "data": {
        "type": "Investor",
        "name": "Promecap",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2b253c21-2fdf-4b7d-aff7-a787e9a80485",
      "data": {
        "type": "Investor",
        "name": "FirstMark Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "02c3fadf-213f-47d4-9ffc-5f7e704d1b4f",
      "data": {
        "type": "Investor",
        "name": "IP Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "32f172c5-4869-4949-8d35-40df2fedf969",
      "data": {
        "type": "Investor",
        "name": "Novartis",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c0b37880-fb0d-42bf-b163-8761466545bb",
      "data": {
        "type": "Investor",
        "name": "China Renaissance",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4fdfdbbb-cd5f-4c74-87f5-c9b90c916435",
      "data": {
        "type": "Investor",
        "name": "Star VC",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5b79e707-5887-402f-9953-2fc1fa419d29",
      "data": {
        "type": "Investor",
        "name": "CreditEase Fintech Investment Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "3bbdd7e6-f179-4975-a905-6e7f4b672e07",
      "data": {
        "type": "Investor",
        "name": "China Fortune Ocean",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e132def9-508e-4ea4-bd23-316cb7fc0e06",
      "data": {
        "type": "Investor",
        "name": "Mizuho Financial Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2ae3b1fb-dfa1-46e3-889d-6535ac644dc4",
      "data": {
        "type": "Investor",
        "name": "Sound Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a37e91c7-9083-4b20-a481-96cc3c792a08",
      "data": {
        "type": "Investor",
        "name": "Amadeus Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6bd1e2ff-e46d-4342-8c57-ce8df07db882",
      "data": {
        "type": "Investor",
        "name": "GX Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "45b9f239-2e9b-4b50-ba6c-95712a540eeb",
      "data": {
        "type": "Investor",
        "name": "Boyu Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "377ebcac-88df-41e9-b275-250b1c0f8be2",
      "data": {
        "type": "Investor",
        "name": "Index",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ce6ecfe2-50d9-40a7-b298-b8030e067594",
      "data": {
        "type": "Investor",
        "name": "Northgate Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fa50393d-0a70-494e-861c-8430a7e977c1",
      "data": {
        "type": "Investor",
        "name": "Valar Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "51d181d5-0b5f-4594-bc9b-e1f9974cc057",
      "data": {
        "type": "Investor",
        "name": "Monashees+",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "cb47759d-5d63-41e2-8d86-00b7f3ade842",
      "data": {
        "type": "Investor",
        "name": "CAS Investment Management Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d7f67d16-1f2f-404b-96fd-2a4bb1f647dc",
      "data": {
        "type": "Investor",
        "name": "Clermont Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ad725064-7fce-4167-acca-ad994be409cd",
      "data": {
        "type": "Investor",
        "name": "Earlybird Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "684ca449-676e-4369-8705-d7b601742f4f",
      "data": {
        "type": "Investor",
        "name": "GIC",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3bea3991-afee-4aa3-a404-283bb778097d",
      "data": {
        "type": "Investor",
        "name": "Bank of China",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2f03b7f8-211c-4c9d-93cd-d66b28cf9ab9",
      "data": {
        "type": "Investor",
        "name": "Teamworthy Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b8540838-4ac4-48ab-8c50-22b42fe604c3",
      "data": {
        "type": "Investor",
        "name": "Oriza Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e7412875-6248-4e51-a933-edfdcaa2eb3d",
      "data": {
        "type": "Investor",
        "name": "Caffeinated Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9d2625e7-a6ac-4434-8caa-3c1dc5bae9d6",
      "data": {
        "type": "Investor",
        "name": "Harrison Metal",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "eeee0937-10e0-4586-91c2-67ca462f788f",
      "data": {
        "type": "Investor",
        "name": "Menlo Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "ca6f8c66-d920-4163-b877-640f7213469e",
      "data": {
        "type": "Investor",
        "name": "Propel Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ae4373bc-c636-4a52-bc43-ce8c98a651c4",
      "data": {
        "type": "Investor",
        "name": "Aglae Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ed36811a-e178-4f08-b42a-dca8f02cf5fd",
      "data": {
        "type": "Investor",
        "name": "e.ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "49726e02-b29f-4333-aa05-1dafeb3802dd",
      "data": {
        "type": "Investor",
        "name": "Funa Yuanchuang Technology",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "598d7946-f545-4d7a-a1f6-2839fe251634",
      "data": {
        "type": "Investor",
        "name": "Volcanics Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3b2b1981-f14f-45b7-bb14-c2581133dff5",
      "data": {
        "type": "Investor",
        "name": "Steadview Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a9f6a4ad-d343-496e-b5e1-0d044b970c33",
      "data": {
        "type": "Investor",
        "name": "RedBird Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "37b0dead-dcaf-4650-b892-a4fc76038e12",
      "data": {
        "type": "Investor",
        "name": "Google",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711",
      "data": {
        "type": "Investor",
        "name": "Temasek Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 8
      }
    },
    {
      "id": "782ddb40-b795-4748-a984-5f2dab7e096c",
      "data": {
        "type": "Investor",
        "name": "Invesco Perpetual",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "92528557-833d-4a52-b7ac-f2e8c5034722",
      "data": {
        "type": "Investor",
        "name": "Temasek Holdings Ltd.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "eb73a851-88c3-4276-a438-3bbd078d3c67",
      "data": {
        "type": "Investor",
        "name": "NXC",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a0d87cef-fc02-4288-a214-276426279ffe",
      "data": {
        "type": "Investor",
        "name": "Data Collective",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "baa1b8c4-a2f2-4967-805a-9d621cb9d8a5",
      "data": {
        "type": "Investor",
        "name": "Nichi-Iko Pharmaceutical",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8f898648-5692-4d44-b2d7-be4b9a723f76",
      "data": {
        "type": "Investor",
        "name": "V Star Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9c5b30f5-bdb5-4877-bfd3-5674690689cc",
      "data": {
        "type": "Investor",
        "name": "Pear",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "99c05d67-336d-4a26-bd7d-41a2d2354474",
      "data": {
        "type": "Investor",
        "name": "Ant Financial Services Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "51b5a0b8-ac13-4a13-a0e1-def6d1c32fa4",
      "data": {
        "type": "Investor",
        "name": "500 Startups",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "3d8c769f-8fd4-445d-8726-1ecbdce74ac0",
      "data": {
        "type": "Investor",
        "name": "Nor-Cal Invest",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a50d2fbf-a9ad-4ad8-97d1-5fe1a2bf7810",
      "data": {
        "type": "Investor",
        "name": "General Catalyst Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b3798caf-a0d5-4187-9239-2cc104ac3c0b",
      "data": {
        "type": "Investor",
        "name": "Motus Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "85ce0dea-31a7-49ed-b674-e15ac6fe3b73",
      "data": {
        "type": "Investor",
        "name": "Ribbit Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 5
      }
    },
    {
      "id": "03b7786a-0552-42c8-b28e-fb083df33cf2",
      "data": {
        "type": "Investor",
        "name": "Yunfeng Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ba898cde-d88e-4c7f-bea9-f2eabcca9c47",
      "data": {
        "type": "Investor",
        "name": "China Everbright Limited",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e2fd69e3-55ad-43bc-a503-dee049aa67ab",
      "data": {
        "type": "Investor",
        "name": "dievini Hopp BioTech Holding & Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "73e2ae84-878f-4207-b4bc-4e1bc663cbf1",
      "data": {
        "type": "Investor",
        "name": "Azure Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b68b9025-b85c-4e7e-b179-bc5ee5186732",
      "data": {
        "type": "Investor",
        "name": "Alibaba Entrepreneurs Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "18285b10-f136-4a93-b6c0-88d0ae678f99",
      "data": {
        "type": "Investor",
        "name": "Kerala Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "df2fe4b3-33df-44b3-b9cc-3df8aa9c679d",
      "data": {
        "type": "Investor",
        "name": "Sky9 Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2eee18fd-54d3-4b91-8fd1-ee4fea36d74e",
      "data": {
        "type": "Investor",
        "name": "SAIF Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8774b975-8813-4fe5-9f14-1131e04c9e58",
      "data": {
        "type": "Investor",
        "name": "Insight Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 8
      }
    },
    {
      "id": "07b6b963-b08e-4946-b788-7321a0811e4f",
      "data": {
        "type": "Investor",
        "name": "Info Edge",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1d286897-0a2e-4add-ada1-b69c0de73051",
      "data": {
        "type": "Investor",
        "name": "Kibo Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fe743b9a-d96a-4d9f-8fbc-833c4256eaab",
      "data": {
        "type": "Investor",
        "name": "March Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25",
      "data": {
        "type": "Investor",
        "name": "Tiger Global Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 15
      }
    },
    {
      "id": "3d8ba45e-46e8-46fa-8a1f-82c2cc7b95cf",
      "data": {
        "type": "Investor",
        "name": "Level Equity",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f5243f40-93fb-4ac0-b92f-c5e5cb19cfd6",
      "data": {
        "type": "Investor",
        "name": "Sinovation Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5962a57f-8eca-43c3-bff8-21ab2f8ce1b3",
      "data": {
        "type": "Investor",
        "name": "Asian Development Bank",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2ccc512e-0eaf-4050-b6d2-be70558abbd2",
      "data": {
        "type": "Investor",
        "name": "China Development Bank Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f188d001-9397-4bda-bb9a-f649f45dd4c0",
      "data": {
        "type": "Investor",
        "name": "Accel",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 12
      }
    },
    {
      "id": "dde82b59-3dff-4e7a-9767-94641ebb043e",
      "data": {
        "type": "Investor",
        "name": "Felicis Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a4e008d9-e066-4b7c-a5b6-69aa1265ad18",
      "data": {
        "type": "Investor",
        "name": "IFC",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "49336bf1-3f56-4de5-a119-ba821d418b57",
      "data": {
        "type": "Investor",
        "name": "General Catalyst",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 8
      }
    },
    {
      "id": "86008cb5-33cc-497c-82f6-4c8067c0dacd",
      "data": {
        "type": "Investor",
        "name": "Pacific Century Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "bc649b88-aed0-4294-b632-26b7c5509647",
      "data": {
        "type": "Investor",
        "name": "index Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "84ecfde3-5f13-4069-8b89-29c6f293ae1b",
      "data": {
        "type": "Investor",
        "name": "Sequoia Capital India",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "abd02613-b8c0-4e58-a4ff-014b7b7b4920",
      "data": {
        "type": "Investor",
        "name": "Redalpine Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1441db0d-8176-4bb8-9036-ccbe3ffa6ee0",
      "data": {
        "type": "Investor",
        "name": "Xiang He Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a79106ff-3e11-4b71-8fb7-38b68579228c",
      "data": {
        "type": "Investor",
        "name": "Baidu",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "6615d50a-dd51-4c8a-ac8a-2b43a9e80246",
      "data": {
        "type": "Investor",
        "name": "CapitalG",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "df21d120-f6c7-4155-887d-7f6b8ce2288a",
      "data": {
        "type": "Investor",
        "name": "QingSong Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9c20e64c-2b33-4311-a118-db7a5605fb06",
      "data": {
        "type": "Investor",
        "name": "Warbug Pincus",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "23996d2b-0818-40f4-9ce3-a12030be4e8b",
      "data": {
        "type": "Investor",
        "name": "Batavia Incubator",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8ff7ea61-c345-4aee-864f-f9ce07589289",
      "data": {
        "type": "Investor",
        "name": "QiMing Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "6999663c-24f0-415c-9481-3306a70e8df5",
      "data": {
        "type": "Investor",
        "name": "Fonds de Solidarite FTQ",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "997f4b56-7b13-4ec9-8d72-1958ae026803",
      "data": {
        "type": "Investor",
        "name": "Benchmark Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8e3fbc5f-14dd-4bda-be19-2352e400534b",
      "data": {
        "type": "Investor",
        "name": "Amazon",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "ba0c531f-b802-44fc-a3eb-557d588f5b75",
      "data": {
        "type": "Investor",
        "name": "Caterpillar",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "39e8b33f-8245-4bc0-b8fb-1174e73042eb",
      "data": {
        "type": "Investor",
        "name": "Global Logistic Properties",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3dfeff17-33c0-4e19-922c-59f0c42aaf62",
      "data": {
        "type": "Investor",
        "name": "Granite Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e36b9542-27ea-4821-b6a0-f6bdf652a918",
      "data": {
        "type": "Investor",
        "name": "Cambridge Innovation Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9b058ed5-9b62-41ea-9dbc-52aa89cb8e2e",
      "data": {
        "type": "Investor",
        "name": "Telling Telecommunication Holding Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "168fd96c-100b-4afd-bf84-495a0146d4be",
      "data": {
        "type": "Investor",
        "name": "Jackson Square Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "9dbbb4f5-b825-4bb0-8118-7ebcab080c23",
      "data": {
        "type": "Investor",
        "name": "Summerhill Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "27ddff72-2698-4d9b-bb6a-381f59ec361c",
      "data": {
        "type": "Investor",
        "name": "Seven Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9769c33a-7f64-4add-81be-de927359e24e",
      "data": {
        "type": "Investor",
        "name": "Sequoia Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 25
      }
    },
    {
      "id": "036b29c9-79aa-4c54-89c0-51ff8370b613",
      "data": {
        "type": "Investor",
        "name": "Learn Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "15c038c2-9e5d-4ac3-9d5f-f7da404a5530",
      "data": {
        "type": "Investor",
        "name": "Greenoaks Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "08e1b03d-b47f-4796-a7f1-f4271cd651a7",
      "data": {
        "type": "Investor",
        "name": "Accel India",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "eff071c8-df8b-4d5b-a247-6932fe0ce410",
      "data": {
        "type": "Investor",
        "name": "China Broadband Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "715ecf13-bab8-4db9-baac-977e05948622",
      "data": {
        "type": "Investor",
        "name": "K2VC",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "6ebfaf8a-c49b-4dae-966b-5b98ecf0845f",
      "data": {
        "type": "Investor",
        "name": "Norwest Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "840ce1b1-8df6-4b8d-9196-873adbee2e15",
      "data": {
        "type": "Investor",
        "name": "Smash Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "57bd9069-a0bb-44e1-b6f2-30f7b6c4ee0d",
      "data": {
        "type": "Investor",
        "name": "Lightbank",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d16a8bdb-da4c-484f-91f4-d73d74cb6ad8",
      "data": {
        "type": "Investor",
        "name": "Microsoft ScaleUp",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "dfecd3dc-c13b-4dac-91fd-43f061e563fe",
      "data": {
        "type": "Investor",
        "name": "Eurazeo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2fd425d1-3e17-430d-944f-ec064beed948",
      "data": {
        "type": "Investor",
        "name": "Uber",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "86c7500a-801b-4c43-9a5c-504bc53f13b6",
      "data": {
        "type": "Investor",
        "name": "Hinduja Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "68da9abc-4553-4665-a40c-3b4a4efa0880",
      "data": {
        "type": "Investor",
        "name": "Just Eat",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "efc32bca-bed5-423e-b012-a55a375311b5",
      "data": {
        "type": "Investor",
        "name": "Fortune Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e49f8c0f-8bf1-44ff-bbe7-e8c43e3f2d9a",
      "data": {
        "type": "Investor",
        "name": "Blackrock",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "72d8dc53-f180-469f-81e5-805c65f347ea",
      "data": {
        "type": "Investor",
        "name": "Riverwood Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "23693336-47a1-450d-9ec9-ce727c0e8551",
      "data": {
        "type": "Investor",
        "name": "58.com",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b2eac896-85c5-4c4b-9056-83992c89ccd5",
      "data": {
        "type": "Investor",
        "name": "Matrix Partners China",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "5693c8c9-a39a-439e-ace7-9faa4e4fccba",
      "data": {
        "type": "Investor",
        "name": "GF Xinde Investment Management Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "64c7d764-e5cb-4cfc-864a-02d5b5b9533f",
      "data": {
        "type": "Investor",
        "name": "Orange Digital Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "349fcb31-4471-4c0b-b20e-45b2cf4748fc",
      "data": {
        "type": "Investor",
        "name": "Maveron",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9e99f90e-db7d-4bc8-abb5-2d1137e32abe",
      "data": {
        "type": "Investor",
        "name": "North Bridge Growth Equity",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3ea8fee5-a31a-4662-9895-315c131b54b4",
      "data": {
        "type": "Investor",
        "name": "FAW Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "32046e21-86dc-44c9-b654-ff699e6ba005",
      "data": {
        "type": "Investor",
        "name": "Novacap Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "81feb991-b743-4d72-83f4-dd5b311b21c5",
      "data": {
        "type": "Investor",
        "name": "Madrona Venture Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b51ead58-2a71-49b3-bff8-474d8a433811",
      "data": {
        "type": "Investor",
        "name": "Iconiq Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "830d5985-d0e0-4162-8903-4f93ff3b9e5b",
      "data": {
        "type": "Investor",
        "name": "ZhenFund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "dc54d21a-71ac-43f9-a725-ca0dbaa7ae38",
      "data": {
        "type": "Investor",
        "name": "Matrix Partners India",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6d915a0a-0e83-4337-98e2-3b8b63d44611",
      "data": {
        "type": "Investor",
        "name": "Sina Weibo",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "c5eb77d4-d9de-4d87-8aea-b89ed1bbee8e",
      "data": {
        "type": "Investor",
        "name": "Phoenix New Media",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ffee4dc8-3dbc-49f6-9851-0a748e335e9c",
      "data": {
        "type": "Investor",
        "name": "NextView Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "13f47b7c-a8eb-404b-a626-e660f2ba3dc2",
      "data": {
        "type": "Investor",
        "name": "North Bridge Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3dca3006-6dfe-4383-89e3-c93959edeaa0",
      "data": {
        "type": "Investor",
        "name": "Blackbird Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fe203eb6-a449-4068-841b-59502e1ce664",
      "data": {
        "type": "Investor",
        "name": "Magma Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "81db4ffc-e5ae-4dc5-bd40-b3421977d8a8",
      "data": {
        "type": "Investor",
        "name": "Acequia Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "08e9259a-7d11-43f3-b344-0947dd58ca7b",
      "data": {
        "type": "Investor",
        "name": "Lowercase Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "c8ac58aa-a0a8-422c-b8e3-49ada40674df",
      "data": {
        "type": "Investor",
        "name": "Lightspeed China Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "550bdee0-1bd6-420d-8f5b-b51b8ac89c35",
      "data": {
        "type": "Investor",
        "name": "Didi Chuxing",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "82c9abc2-e952-4e08-bdb8-32126d7755ca",
      "data": {
        "type": "Investor",
        "name": "Piton Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e1d1f0e8-0a15-46a4-a885-409d6fca04a5",
      "data": {
        "type": "Investor",
        "name": "Flare Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a106c520-6530-4374-b381-8606c969fb4c",
      "data": {
        "type": "Investor",
        "name": "Huasheng Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "68bf56a0-74b8-44ce-8a47-a74b4689deaa",
      "data": {
        "type": "Investor",
        "name": "Spark Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "55360bf6-84f3-4400-b69d-c189c466d86c",
      "data": {
        "type": "Investor",
        "name": "Sherpalo Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a1494274-d2b4-4338-aaac-d8dabc5c9f6d",
      "data": {
        "type": "Investor",
        "name": "Yinxinggu Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ac5a0d82-a1d5-4ee4-8d3a-dcf6122531ee",
      "data": {
        "type": "Investor",
        "name": "CMC Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ba580911-6aa0-4243-9c67-cfeff460e75f",
      "data": {
        "type": "Investor",
        "name": "Stonebridge Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "27e9177c-f7bd-4f73-ad9d-03db97761de6",
      "data": {
        "type": "Investor",
        "name": "China Media Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5eedd16b-e9e2-4fae-ad36-844a643896a7",
      "data": {
        "type": "Investor",
        "name": "Scentan Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "79e026b6-9e65-4f36-97a4-dce1d3a1d6ae",
      "data": {
        "type": "Investor",
        "name": "Samsung Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ac2d332e-9dc4-4d0c-a5b2-8f12818e6525",
      "data": {
        "type": "Investor",
        "name": "Silverlink Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "663a44eb-f3d6-430b-a631-9aaec1a37ebb",
      "data": {
        "type": "Investor",
        "name": "Generation Investment Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "13c7faed-b053-4151-9de9-82d8934a9b0c",
      "data": {
        "type": "Investor",
        "name": "Foundry Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "afc83851-b62c-4b42-aafe-b195e2a22c3d",
      "data": {
        "type": "Investor",
        "name": "L Catterton",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "399d3efd-2635-4761-85a8-a3dcb01d5019",
      "data": {
        "type": "Investor",
        "name": "Walden International",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "42acb4cd-d4f6-414a-bf4d-3e100cf6abe2",
      "data": {
        "type": "Investor",
        "name": "Redpoint e.ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "4caff022-1bea-4193-b8f4-bff549a87de0",
      "data": {
        "type": "Investor",
        "name": "Goldstone Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "dc93409a-b1e8-4fea-b774-31ca3fb9fded",
      "data": {
        "type": "Investor",
        "name": "Softbank",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "081b3241-848a-47cf-9928-7b93add9b95b",
      "data": {
        "type": "Investor",
        "name": "TAL Education Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "db9a7312-9d77-4daa-9def-2c3bb8bcb7df",
      "data": {
        "type": "Investor",
        "name": "Beijing Shuju Xinrong Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d2c64f56-5983-4936-a398-e10e966bff0b",
      "data": {
        "type": "Investor",
        "name": "BOLDstart Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7b910deb-221c-4577-92ef-145db9eb741a",
      "data": {
        "type": "Investor",
        "name": "Woodford Investment Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "893a879b-2f65-42e4-a769-1fc0efdcc928",
      "data": {
        "type": "Investor",
        "name": "Lindeman Asia Investment",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "097c4014-6172-4416-b937-1fca06412828",
      "data": {
        "type": "Investor",
        "name": "Blue Label Telecoms",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "051707b9-0d35-400c-87d3-e8533903fe02",
      "data": {
        "type": "Investor",
        "name": "Co-Energy Finance",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "846849cb-a387-414b-8e83-2b67c19c4542",
      "data": {
        "type": "Investor",
        "name": "Bill & Melinda Gates Foundation",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6878c176-651f-4580-af3b-d8db87f70f3d",
      "data": {
        "type": "Investor",
        "name": "VY Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c6922f5d-8375-4c4a-8560-5e47f79300f0",
      "data": {
        "type": "Investor",
        "name": "Tenaya Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "6fd466a2-c0d7-4c41-b9c2-d6fb2f465242",
      "data": {
        "type": "Investor",
        "name": "Times Internet",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f75db036-987d-43cb-8968-ef68f906416f",
      "data": {
        "type": "Investor",
        "name": "Geodesic Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7003c56b-ab1e-45fe-ab16-969335c4e595",
      "data": {
        "type": "Investor",
        "name": "Sunstone Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "53b454ae-4bc2-47f8-aa53-5fc0566011d9",
      "data": {
        "type": "Investor",
        "name": "Chiratae Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "60b67a25-437e-45c4-87c8-4941c4f15d21",
      "data": {
        "type": "Investor",
        "name": "IDG Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 12
      }
    },
    {
      "id": "a9ac20ea-5b76-4827-9da3-815011b0e567",
      "data": {
        "type": "Investor",
        "name": "Valiant Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f19ad04c-150b-4e94-804b-90c30c3d73ec",
      "data": {
        "type": "Investor",
        "name": "Softbank Corp.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "6cf2de49-bee8-4a56-a23d-d4fac927e78c",
      "data": {
        "type": "Investor",
        "name": "Leonardo DiCaprio",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6a55b0c7-60d3-4133-ac9b-a65ffbd21b82",
      "data": {
        "type": "Investor",
        "name": "CommerzVentures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "50b43fb5-a600-4bcb-ae9e-b110535b8fa5",
      "data": {
        "type": "Investor",
        "name": "Investment Corporation of Dubai",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2e8c497f-849b-4ea6-9ed5-df335431be4b",
      "data": {
        "type": "Investor",
        "name": "Greycroft",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "b39a6c5e-a72b-4edb-b009-d1255d402d0c",
      "data": {
        "type": "Investor",
        "name": "Founders Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 10
      }
    },
    {
      "id": "46e5e478-8d79-47d0-acc3-2dca8b941064",
      "data": {
        "type": "Investor",
        "name": "MHS Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "1931627b-ab96-4461-9fee-819d96f194c1",
      "data": {
        "type": "Investor",
        "name": "Francisco Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "07fb1584-2c3d-448f-93fb-d63c2166836c",
      "data": {
        "type": "Investor",
        "name": "Rhone Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c2e2971b-ded0-4907-bae2-080098bce87e",
      "data": {
        "type": "Investor",
        "name": "Benchmark",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 5
      }
    },
    {
      "id": "6d316b70-d670-4d4d-8f12-2a4730a9c47e",
      "data": {
        "type": "Investor",
        "name": "True Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9b4b6115-46dc-4aa2-afd8-a478d35637c3",
      "data": {
        "type": "Investor",
        "name": "Hillhouse Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "5194c6d4-d879-41af-bd0e-b5df4372331b",
      "data": {
        "type": "Investor",
        "name": "Vcanbio",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5b3b382c-4284-47b0-bc4e-a45b2ccb2fb1",
      "data": {
        "type": "Investor",
        "name": "QED Investors",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "4ce16e74-9f5b-4f44-962c-95892918054f",
      "data": {
        "type": "Investor",
        "name": "Revolution Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f5aa1594-845c-4be0-b91a-a5b3a5d9478f",
      "data": {
        "type": "Investor",
        "name": "Koch Disruptive Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "390def74-3c8a-4215-9913-95951d6621ed",
      "data": {
        "type": "Investor",
        "name": "China Life Insurance",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e96c2596-5336-4f04-a799-adb8905d0a5e",
      "data": {
        "type": "Investor",
        "name": "Globis Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d7cfb938-0b60-4d4f-aa42-e29226ed3fbf",
      "data": {
        "type": "Investor",
        "name": "The Carlyle Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "4931c9d0-de29-43e0-ae43-ee88225fe345",
      "data": {
        "type": "Investor",
        "name": "Craft Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ef4cd919-366d-4cb7-88e9-b60c2fa04221",
      "data": {
        "type": "Investor",
        "name": "Kite Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d150e50c-e4bb-4da7-9c2a-f3b6bc060fca",
      "data": {
        "type": "Investor",
        "name": "K9 Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8280c6dd-49e6-4e59-8b46-a4e771f6f6ec",
      "data": {
        "type": "Investor",
        "name": "Formation 8",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "61b74829-303c-4cf7-9782-b93ba985b56d",
      "data": {
        "type": "Investor",
        "name": "Andreessen Horowitz",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 17
      }
    },
    {
      "id": "b97e7863-c538-4d4a-8e8a-584191bd1860",
      "data": {
        "type": "Investor",
        "name": "Grab",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "feca77d2-14f7-46f6-8233-db5f9e459d17",
      "data": {
        "type": "Investor",
        "name": "Trifecta Capital Advisors",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7adc3105-0141-4362-a0c5-8ffa922de302",
      "data": {
        "type": "Investor",
        "name": "Rusnano",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fb484342-4774-4fc1-846a-e1459cb8f472",
      "data": {
        "type": "Investor",
        "name": "Storm Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7b70b439-3c9e-44df-bfe4-0399c2cb07d6",
      "data": {
        "type": "Investor",
        "name": "Grandland",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8c121e72-809a-4359-bfda-1e6b0d6dbc42",
      "data": {
        "type": "Investor",
        "name": "Tiantu Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "310af81d-79e5-43d7-9db8-7bf2a31fa985",
      "data": {
        "type": "Investor",
        "name": "NewView Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5ae53ad7-90b6-49f1-889e-0329c8f4af53",
      "data": {
        "type": "Investor",
        "name": "Tianjin Haihe Industry Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e6c4e88a-30ba-44cc-90b7-2d3b2323b832",
      "data": {
        "type": "Investor",
        "name": "Ardian",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "afd1fc77-13d0-472d-8deb-5957725f3a14",
      "data": {
        "type": "Investor",
        "name": "M12",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b91301db-168c-4f34-9c25-3da656536db7",
      "data": {
        "type": "Investor",
        "name": "BDC Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "37b3f23e-9315-4783-b0fb-52136440e421",
      "data": {
        "type": "Investor",
        "name": "Public Investment Fund of Saudi Arabia",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b819cb40-d171-4afd-b960-8240bb31ee01",
      "data": {
        "type": "Investor",
        "name": "Galaxy Digital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "07d7bb28-6c45-4ac3-9043-624c151a4632",
      "data": {
        "type": "Investor",
        "name": "BlueRun Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "57093fb7-a551-4e5c-b918-9645c8716327",
      "data": {
        "type": "Investor",
        "name": "VMware",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "738f59ea-7d7b-4257-b71d-04210e837a6a",
      "data": {
        "type": "Investor",
        "name": "Russia-China Investment Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e6e04211-334d-4779-85d1-ac760b709219",
      "data": {
        "type": "Investor",
        "name": "China Reform Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b8a2f958-c4af-46ed-9d60-05f32043fcc0",
      "data": {
        "type": "Investor",
        "name": "Baseline Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed",
      "data": {
        "type": "Investor",
        "name": "Lightspeed Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 9
      }
    },
    {
      "id": "91401a27-4e73-4da7-84c5-b6cd7d667ca4",
      "data": {
        "type": "Investor",
        "name": "MindWorks Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c7b732bc-58bb-4cf4-87d2-3ea73504137b",
      "data": {
        "type": "Investor",
        "name": "Propulsion Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5e530f23-5852-4aae-b950-0e725c088319",
      "data": {
        "type": "Investor",
        "name": "SAIF Partners China",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "02133eef-a84d-466f-b577-1b693e082699",
      "data": {
        "type": "Investor",
        "name": "ENIAC Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2cc9ad8d-5194-4381-9fd6-58586ad426c3",
      "data": {
        "type": "Investor",
        "name": "SoftBank Group. Monashees+",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "91de2522-6744-4fb9-8e03-72fa9de2776a",
      "data": {
        "type": "Investor",
        "name": "FinLab",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "593836a7-af6c-4f59-8d53-37bc3612e4d0",
      "data": {
        "type": "Investor",
        "name": "Pitango Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "31fd441a-0dab-48d4-b7d9-e32e98db1e64",
      "data": {
        "type": "Investor",
        "name": "ES Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "94e09efe-cc72-4d27-94bd-8cf5f9136dfb",
      "data": {
        "type": "Investor",
        "name": "A&E Television Networks",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "13cc6387-68c1-4938-a1e0-1cf337a0e9e3",
      "data": {
        "type": "Investor",
        "name": "Wakefield Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "62a8a0f9-1bab-4736-bbd6-2609eeea9084",
      "data": {
        "type": "Investor",
        "name": "New Horizon Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c0e54da6-002f-4de2-817b-b5cb4738c465",
      "data": {
        "type": "Investor",
        "name": "Bedrock Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4b65f341-97c3-4777-aa70-05c5a42fcd5a",
      "data": {
        "type": "Investor",
        "name": "Dell Technologies Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "22ec5644-2aa8-4e00-a6f1-49d171521ae6",
      "data": {
        "type": "Investor",
        "name": "Shenzhen Qianhe Capital Management Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a9f91b09-1a41-4326-aa65-34ec8f13702e",
      "data": {
        "type": "Investor",
        "name": "Union Square Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "5ee74a57-0f78-4b3f-88a5-4f04ca1095d0",
      "data": {
        "type": "Investor",
        "name": "Berkshire Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "75ee7453-b691-429b-878c-2994f8c1630f",
      "data": {
        "type": "Investor",
        "name": "Movile",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "854ff216-0457-4699-a6e0-d3954662fcf4",
      "data": {
        "type": "Investor",
        "name": "TPG Alternative & Renewable Technologies",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9c45692a-4d48-40c4-8e6a-ce99312a1bfc",
      "data": {
        "type": "Investor",
        "name": "Legend Star",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5539e3a2-28f2-492d-9894-33d6ccd47a46",
      "data": {
        "type": "Investor",
        "name": "Ignition Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "acac8623-7773-456f-ad72-68b818265ca0",
      "data": {
        "type": "Investor",
        "name": "Institutional Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 5
      }
    },
    {
      "id": "6065769c-9eb1-4e9f-a392-a76bfa811563",
      "data": {
        "type": "Investor",
        "name": "Mayfield Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "94f56ccc-2672-4f27-b7f5-2f6aa8c038ab",
      "data": {
        "type": "Investor",
        "name": "DC Thomson Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "9a8bb801-a3d0-4f24-adfe-315662c958e7",
      "data": {
        "type": "Investor",
        "name": "Advantech Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "bf3343f9-8e2d-4d7d-9b5d-5b5557da96c2",
      "data": {
        "type": "Investor",
        "name": "Tiger Global management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "8d43f87d-2ccd-4ac3-aaf9-fba24aafee10",
      "data": {
        "type": "Investor",
        "name": "China Environmental Protection Industry",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8fb9d263-8bbb-4427-b9fc-399e88c5d504",
      "data": {
        "type": "Investor",
        "name": "August Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "5ea60212-1eb7-4e09-a4ef-3c14d3cafd18",
      "data": {
        "type": "Investor",
        "name": "Shenzhen Capital Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "77194b87-c1c2-42da-b4db-44ad733497f3",
      "data": {
        "type": "Investor",
        "name": "Bright Venture Capita",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2c7fe19a-cf14-4dae-8172-9cb579909848",
      "data": {
        "type": "Investor",
        "name": "Softbank Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "ada85c78-cfe2-41ea-9df8-4bc11d4a2deb",
      "data": {
        "type": "Investor",
        "name": "Ireland Strategic Investment Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a41a7ee5-b7b6-4ffa-b0be-da47632939e6",
      "data": {
        "type": "Investor",
        "name": "Visa",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fc67fd7b-1f1e-41ee-b212-1d604438da10",
      "data": {
        "type": "Investor",
        "name": "Y Combinator",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 8
      }
    },
    {
      "id": "4e82149a-c359-4e29-9e87-3cb18e8d4a96",
      "data": {
        "type": "Investor",
        "name": "Lerer Hippeau Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "96bcf603-a352-4ea0-8cff-17425a135130",
      "data": {
        "type": "Investor",
        "name": "Kinnevik",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8914672b-d344-4b25-9ea0-da98439f5879",
      "data": {
        "type": "Investor",
        "name": "JD Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4165d12a-4504-463b-8ec5-d9c54fd3c67d",
      "data": {
        "type": "Investor",
        "name": "Rakuten",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c",
      "data": {
        "type": "Investor",
        "name": "SoftBank Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 17
      }
    },
    {
      "id": "0146ed58-7594-45a5-8888-4ef86aecb643",
      "data": {
        "type": "Investor",
        "name": "Merrysunny Wealth",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6f5c6b59-0021-4e20-aee8-83473b355f9f",
      "data": {
        "type": "Investor",
        "name": "Qualcomm Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 5
      }
    },
    {
      "id": "ec5af397-391d-42a5-8984-4ef0891146d7",
      "data": {
        "type": "Investor",
        "name": "Credit Suisse",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e0833ee2-6e76-4fc5-aea2-0b8ab2d3df78",
      "data": {
        "type": "Investor",
        "name": "JOY Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6370de00-5601-4e8d-bb6e-923c5b5fe4c9",
      "data": {
        "type": "Investor",
        "name": "Bertelsmann Asia Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b",
      "data": {
        "type": "Investor",
        "name": "KKR",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 9
      }
    },
    {
      "id": "395df62a-1691-4351-a38a-abead9605b7e",
      "data": {
        "type": "Investor",
        "name": "Rho Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "72b09f8f-45e3-4bea-97cb-6fed78d97b02",
      "data": {
        "type": "Investor",
        "name": "Access Industries",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "ea9d185a-0699-49c8-bc37-229793e9eabc",
      "data": {
        "type": "Investor",
        "name": "Accomplice",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4fd4a866-def8-454f-a1ee-3ac9af54f361",
      "data": {
        "type": "Investor",
        "name": "O'Connor Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "27570dbd-ecc7-4416-84d1-455be99378a2",
      "data": {
        "type": "Investor",
        "name": "Moore Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2a6b84da-2ad0-425b-bdc2-ed5a98c6c438",
      "data": {
        "type": "Investor",
        "name": "MPM Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a493d447-138f-4c22-93e0-575d7b87e8ef",
      "data": {
        "type": "Investor",
        "name": "Fosun RZ Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4e8637fa-49ea-4771-86b5-9aecee89959c",
      "data": {
        "type": "Investor",
        "name": "Highland Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d405213f-34e6-47db-b2a4-d1b2fdb8f494",
      "data": {
        "type": "Investor",
        "name": "Mohr Davidow Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6b89c32b-c9c1-4773-bf5c-c246c94bcad8",
      "data": {
        "type": "Investor",
        "name": "Activant Capital Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "423b88cd-bbf5-4fa2-8463-d16c06a5286c",
      "data": {
        "type": "Investor",
        "name": "Loyal Valley Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a61905f5-b2ad-47f6-bad3-108f88a93972",
      "data": {
        "type": "Investor",
        "name": "InCube Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7617a2ac-c26c-45d3-97ee-516ef2796b00",
      "data": {
        "type": "Investor",
        "name": "Shang Qi Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "543e3b8a-d292-44d7-9e37-28cde3ca0e37",
      "data": {
        "type": "Investor",
        "name": "Nexus Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "227cb142-e0c9-41f1-9255-7c2170038d6d",
      "data": {
        "type": "Investor",
        "name": "Vattenfall",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "72bfbeb2-7561-4299-880a-0a95e64743e5",
      "data": {
        "type": "Investor",
        "name": "Battery Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 9
      }
    },
    {
      "id": "287fc441-51fb-4294-88a4-3b26597d2cb0",
      "data": {
        "type": "Investor",
        "name": "Atomico",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "7fa3d075-df85-4556-a7f0-93926084db2b",
      "data": {
        "type": "Investor",
        "name": "Launchpad Venture Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0ec80ded-d3db-4f39-9352-df6fb39ce4cb",
      "data": {
        "type": "Investor",
        "name": "Polaris Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0ccbe101-da60-439c-b087-05eab717ec36",
      "data": {
        "type": "Investor",
        "name": "NewSpring Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5f12e9a7-aee2-4b6f-8642-824d3e20d638",
      "data": {
        "type": "Investor",
        "name": "Google Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 14
      }
    },
    {
      "id": "396a55ff-5a3d-44c8-8624-7b5c420ee4b7",
      "data": {
        "type": "Investor",
        "name": "Ridge Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b8167897-3a74-4d12-8bdd-b3dfc79cdde2",
      "data": {
        "type": "Investor",
        "name": "K2 Global",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a11c71d0-5691-4a7a-968b-1b8db0bc306c",
      "data": {
        "type": "Investor",
        "name": "Essex Woodlands",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c1464c19-1f57-47b0-9afc-1efa3eaf5980",
      "data": {
        "type": "Investor",
        "name": "SBI Investment Korea",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "cf665049-089a-4209-84dd-04d2daa6b39b",
      "data": {
        "type": "Investor",
        "name": "GAM Holding",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a59ecc9c-bc8a-4f4b-a25a-fee4c8368d8f",
      "data": {
        "type": "Investor",
        "name": "SIG Asia Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "51b6dd96-044e-48ac-9be5-90c41b4d98ae",
      "data": {
        "type": "Investor",
        "name": "Eight Roads Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d7e5893d-e951-4392-afbf-3face5d83cb9",
      "data": {
        "type": "Investor",
        "name": "Tusk Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "be74959a-d261-4b06-ac2a-1d92705b27d2",
      "data": {
        "type": "Investor",
        "name": "Industry Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2181a4c0-dcab-4829-96ee-7a056324de41",
      "data": {
        "type": "Investor",
        "name": "Rothenberg Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1da704a2-804d-4209-9cd8-1ea57e523f8f",
      "data": {
        "type": "Investor",
        "name": "Haitong Leading Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6f2a7d2c-5a77-4425-a492-b4ce2848b806",
      "data": {
        "type": "Investor",
        "name": "Meituan Dianping",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f184c5d6-5c64-4b7b-a660-0f709332f24a",
      "data": {
        "type": "Investor",
        "name": "Foxconn Technology Company",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "83a6d517-1539-437b-b4d4-1603f10f5f4e",
      "data": {
        "type": "Investor",
        "name": "Inflexion Private Equity",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e26d9982-b710-4e6a-956a-fd75460e599a",
      "data": {
        "type": "Investor",
        "name": "TLV Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b1b36864-cac5-46a3-bfd5-6b58f33fe1bd",
      "data": {
        "type": "Investor",
        "name": "DCM Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 5
      }
    },
    {
      "id": "07770759-0f2e-4336-a211-b4f55baa1054",
      "data": {
        "type": "Investor",
        "name": "Toscafund Asset Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "52f303f7-7945-46b5-863d-ebd55e44369c",
      "data": {
        "type": "Investor",
        "name": "Founder Collective",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "504abb72-be84-436a-85b4-c8e5d893972b",
      "data": {
        "type": "Investor",
        "name": "Passport Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "84351392-f2da-4e3f-a341-0c701b88bced",
      "data": {
        "type": "Investor",
        "name": "DJF",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4875a289-85dd-44d1-b790-a6e6d48de2aa",
      "data": {
        "type": "Investor",
        "name": "Future Capital Discovery Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "528d8fac-4622-40e7-bdcf-fd97c7d5a865",
      "data": {
        "type": "Investor",
        "name": "Tus Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4187856f-2a21-4846-a015-9ee493cac511",
      "data": {
        "type": "Investor",
        "name": "Vertex Ventures China",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0d52a4d8-470d-4a77-bc80-970f64e1f3c1",
      "data": {
        "type": "Investor",
        "name": "Ten Eleven Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "99b0147f-08a0-45d4-8b36-874500b7d35c",
      "data": {
        "type": "Investor",
        "name": "Merck & Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ec9fdb50-0215-498a-88d6-86076319c6d1",
      "data": {
        "type": "Investor",
        "name": "GP Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4dd16328-137b-48d1-b8b6-7377562cd8df",
      "data": {
        "type": "Investor",
        "name": "N/A",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fad461b0-e153-4f98-ac16-4db3cb7de1e4",
      "data": {
        "type": "Investor",
        "name": "East Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1fb006fe-09b4-4661-9dba-b6830f1e53cd",
      "data": {
        "type": "Investor",
        "name": "iFLYTEK",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "48914a82-fa51-4c89-b2ea-c4647a202319",
      "data": {
        "type": "Investor",
        "name": "SV Angel",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "946d1b1d-07a1-418a-b0db-52f881237945",
      "data": {
        "type": "Investor",
        "name": "Volkswagen Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "550de575-4369-437a-862d-9126d156c397",
      "data": {
        "type": "Investor",
        "name": "Vostok New Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "1418b034-3352-4333-b749-cb62ccb6960a",
      "data": {
        "type": "Investor",
        "name": "Walden Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f772bb7c-c389-4471-82eb-061f95e1f99a",
      "data": {
        "type": "Investor",
        "name": "Vickers Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0da7b685-2b55-44ad-b7b1-081acccd9752",
      "data": {
        "type": "Investor",
        "name": "JD.com",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "df2afc86-fb58-4150-ae7b-25fe0f635a23",
      "data": {
        "type": "Investor",
        "name": "T. Rowe Associates",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f3f1ba74-58a1-44a6-b61a-5d207ff0039d",
      "data": {
        "type": "Investor",
        "name": "Notion Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "ee00bffd-ca26-440b-a14c-0e094f08b455",
      "data": {
        "type": "Investor",
        "name": "Salesforce Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "0aed227f-09d0-4bb4-9d74-85d3a79a98f0",
      "data": {
        "type": "Investor",
        "name": "Viola Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b930f90a-c554-41b7-ac7b-933558e21b9c",
      "data": {
        "type": "Investor",
        "name": "Forerunner Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 5
      }
    },
    {
      "id": "25144b6c-d2c6-4754-8e7e-bfbcd69cab0a",
      "data": {
        "type": "Investor",
        "name": "PayPal Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fdd35941-6205-4313-b05a-ea5a255ca963",
      "data": {
        "type": "Investor",
        "name": "Georgian Co-Investment Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f",
      "data": {
        "type": "Investor",
        "name": "General Atlantic",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 13
      }
    },
    {
      "id": "c5226217-a767-4196-9325-211d20b82217",
      "data": {
        "type": "Investor",
        "name": "BoxGroup",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "145867ca-a62d-47dc-9132-1424d287866c",
      "data": {
        "type": "Investor",
        "name": "Insight Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "2bb1f4dc-803d-42a0-8909-d0c61b87e2d2",
      "data": {
        "type": "Investor",
        "name": "Tiantu Capital Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f28c169b-45da-43f7-90f4-798b0bf3d419",
      "data": {
        "type": "Investor",
        "name": "and Tencent Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1ca7cb20-a51b-4f30-8db2-9f1849d5d1d5",
      "data": {
        "type": "Investor",
        "name": "Temasek",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "887c9b44-c297-4063-8ed3-28a73c391c13",
      "data": {
        "type": "Investor",
        "name": "New Leaf Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "96fc8261-849c-4709-8b35-7bf6be77caf6",
      "data": {
        "type": "Investor",
        "name": "ING",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e2bb88e3-9128-43e0-a051-15b3c71fa03e",
      "data": {
        "type": "Investor",
        "name": "BMW i Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "543fdb44-3d8c-4934-82b4-45ceacafadd1",
      "data": {
        "type": "Investor",
        "name": "Opus Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "25ed3993-a588-43a6-bddf-00379b0fc2fa",
      "data": {
        "type": "Investor",
        "name": "LowercaseCapital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f3626b22-6b6f-4c30-a631-954bbc9e803f",
      "data": {
        "type": "Investor",
        "name": "Old Mutual Global Investors",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a69004ca-04ae-4647-96f9-5d5110c316c8",
      "data": {
        "type": "Investor",
        "name": "Charter Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c",
      "data": {
        "type": "Investor",
        "name": "Kleiner Perkins Caufield & Byers",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 9
      }
    },
    {
      "id": "615e3fd7-1d32-4ec3-aa57-57758a40f836",
      "data": {
        "type": "Investor",
        "name": "Accel Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 7
      }
    },
    {
      "id": "3bff1fa5-caeb-4e67-86ea-eccf20a0e2b8",
      "data": {
        "type": "Investor",
        "name": "Escala Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "bb947f97-ed6e-4c16-aac4-7f1e845cbb21",
      "data": {
        "type": "Investor",
        "name": "Clal Industries and Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8375e973-2090-4db0-a26e-6a0475b46baa",
      "data": {
        "type": "Investor",
        "name": "Entree Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f",
      "data": {
        "type": "Investor",
        "name": "Bessemer Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 13
      }
    },
    {
      "id": "21c93c18-fbb7-4225-a9b6-95c2eb7c20ed",
      "data": {
        "type": "Investor",
        "name": "Altitude Life Science Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6116094a-c7a1-43c1-b96b-97af4fed968c",
      "data": {
        "type": "Investor",
        "name": "JERA",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fcb445b3-e2d5-4c68-b3c5-73ccda39a06e",
      "data": {
        "type": "Investor",
        "name": "OPTrust",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d6ad8cca-c278-4a3a-be20-453394ee9945",
      "data": {
        "type": "Investor",
        "name": "MassVentures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "e641b6d6-d4a3-48c4-b20c-076f4fe3950a",
      "data": {
        "type": "Investor",
        "name": "Kaalari Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a1bac567-a747-499b-adc4-6c41c1e16958",
      "data": {
        "type": "Investor",
        "name": "Redpoint Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 7
      }
    },
    {
      "id": "0fcd668f-c6f8-4f8d-bec7-4a31ce543a84",
      "data": {
        "type": "Investor",
        "name": "GCP Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "cfbdb5ea-749d-460d-9a98-cab0381296b3",
      "data": {
        "type": "Investor",
        "name": "Jiangsu Sha Steel Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "dd2b26ea-8985-4f73-a1de-04e8c8f02cdc",
      "data": {
        "type": "Investor",
        "name": "China Minsheng Investment",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "028ce9ec-8214-421f-b182-2201332534c1",
      "data": {
        "type": "Investor",
        "name": "Wing Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab",
      "data": {
        "type": "Investor",
        "name": "DST Global",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 11
      }
    },
    {
      "id": "feabb0a6-8fcf-41fc-884d-e967ecb15185",
      "data": {
        "type": "Investor",
        "name": "Morningside Venture Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "fa91de5b-025a-45c5-8e88-b0c469f8ae76",
      "data": {
        "type": "Investor",
        "name": "Qumra Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "cf15e1d6-2ff9-4bd2-bf1c-32bf9306cbc8",
      "data": {
        "type": "Investor",
        "name": "A&NN",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "22db41fe-98be-436f-8ccd-b8e0da7c6695",
      "data": {
        "type": "Investor",
        "name": "OpenView Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "049e2c60-6640-48f8-8e85-d7b7d5861b2f",
      "data": {
        "type": "Investor",
        "name": "New Enterprise Associates",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 18
      }
    },
    {
      "id": "104871cd-42e4-423d-ba76-2198bf771c4c",
      "data": {
        "type": "Investor",
        "name": "BNP Paribas",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f7b645da-aee9-42c1-8e74-577fb8076f22",
      "data": {
        "type": "Investor",
        "name": "Granite Hill Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d8223b51-7cae-4ab9-bd34-4fb7839e9131",
      "data": {
        "type": "Investor",
        "name": "Linear Venture",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "0f4ac7c4-b796-4856-b761-25a57c81575a",
      "data": {
        "type": "Investor",
        "name": "Toyota Motor Corporation",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "5e0864c3-358f-4066-9478-63a9cf43cabc",
      "data": {
        "type": "Investor",
        "name": "Silicon Valley Bank",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7aa9027c-a156-446d-901d-f4e7b5d9665d",
      "data": {
        "type": "Investor",
        "name": "Lenovo Ventures Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "24224614-c75b-4ff9-8973-9b28f1a12a0d",
      "data": {
        "type": "Investor",
        "name": "Global Founders Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "5d319933-9196-4d1a-bc86-e7ff4f6880a4",
      "data": {
        "type": "Investor",
        "name": "Guangdong Technology Financial Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1ed35ca2-f295-44cd-a0bc-d637810180d5",
      "data": {
        "type": "Investor",
        "name": "SAIF Partners India",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "18d37df3-8ae9-4402-b21a-9f5389e353a1",
      "data": {
        "type": "Investor",
        "name": "Dahong Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "bb059018-2fcb-426a-b59a-d518fcb5a199",
      "data": {
        "type": "Investor",
        "name": "Kaszek Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "85cbeb0e-69a8-4bec-915c-7e736e0ad6e7",
      "data": {
        "type": "Investor",
        "name": "Global Catalyst Partnera",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "bebb1095-4c34-4051-9627-7cb880fbedb3",
      "data": {
        "type": "Investor",
        "name": "Hyundai Motor Company",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "bba108aa-b856-41d9-9677-e41d2e9bd54c",
      "data": {
        "type": "Investor",
        "name": "Chengwei Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "22dec671-f7d4-42ee-b7f3-6a22b27727ce",
      "data": {
        "type": "Investor",
        "name": "Expedia Inc.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7b986f6d-0c87-4208-9e22-dc840e493f63",
      "data": {
        "type": "Investor",
        "name": "Alven Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "3cf6c5de-fb7a-4272-96c3-b2cdc46a15e2",
      "data": {
        "type": "Investor",
        "name": "SoftBankGroup",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "79b1f159-6629-4bce-9cf8-4286aefe1077",
      "data": {
        "type": "Investor",
        "name": "Ford Autonomous Vehicles",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "42b0ae2d-6cac-4243-b6e2-37425aa903e9",
      "data": {
        "type": "Investor",
        "name": "capitalG",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "7e248eda-dc20-47c6-bf62-740d2b90ddea",
      "data": {
        "type": "Investor",
        "name": "One Luxury Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "6f801393-04ad-406d-8166-68b43c92b514",
      "data": {
        "type": "Investor",
        "name": "Matrix Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "157df80d-e98d-4e06-a2ca-2edc78dc01d8",
      "data": {
        "type": "Investor",
        "name": "Alaska Permanent Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "022b93b8-02e7-46c0-a08a-fe02a343d3df",
      "data": {
        "type": "Investor",
        "name": "Advent International",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "35116c97-0048-4764-b7cf-da36fbedc217",
      "data": {
        "type": "Investor",
        "name": "Helion Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8296ed3b-4e8b-41fa-a38e-ff97c6748930",
      "data": {
        "type": "Investor",
        "name": "JAFCO Co",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0bedc8d0-8434-476c-99ae-50e1e77eb9b3",
      "data": {
        "type": "Investor",
        "name": "Comcast Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 4
      }
    },
    {
      "id": "44a8549a-0fd1-43c9-a205-bde0d7cb97cc",
      "data": {
        "type": "Investor",
        "name": "Pokemon Company International",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "234384c0-d041-4770-9310-57cf26e7eed2",
      "data": {
        "type": "Investor",
        "name": "83North",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "06a527f6-0f5a-492f-ae67-cc5a2bac1d9f",
      "data": {
        "type": "Investor",
        "name": "Mithril Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0ebf29f8-8fde-42cc-ba3d-76796a1513a4",
      "data": {
        "type": "Investor",
        "name": "FTV Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "1c0fe135-8cf5-4a4b-b9f8-11e1e85c3c15",
      "data": {
        "type": "Investor",
        "name": "Prometheus Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "0cf6ca94-0881-4525-bb94-b270c6dff262",
      "data": {
        "type": "Investor",
        "name": "Khosla Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 14
      }
    },
    {
      "id": "3dad8718-1857-45be-9849-c057241d1360",
      "data": {
        "type": "Investor",
        "name": "York Capital Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "4e96ee15-395f-4cd7-aff9-d6c962807139",
      "data": {
        "type": "Investor",
        "name": "Yaxia Automobile",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2025adcb-2ef2-45ba-b262-ced22fd56936",
      "data": {
        "type": "Investor",
        "name": "Coatue Management",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "95dee0ff-168b-4088-ac8a-0efd0e139c97",
      "data": {
        "type": "Investor",
        "name": "and Institutional Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "39b8e463-c918-46ef-b3c1-d1760fc633e5",
      "data": {
        "type": "Investor",
        "name": "People Electrical Appliance Group China",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b0684d66-47c1-46aa-897d-6683ac799618",
      "data": {
        "type": "Investor",
        "name": "Source Code Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "37963107-067e-46c8-b519-e7758ab8c90e",
      "data": {
        "type": "Investor",
        "name": "Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "02529fd3-b1a8-432d-b0f1-f5f143b44f2a",
      "data": {
        "type": "Investor",
        "name": "Baillie Gifford & Co.",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "d3ef9cc6-e8d0-4d38-a7d7-91f00011920d",
      "data": {
        "type": "Investor",
        "name": "Kefa Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "3b93333b-9843-45dc-b279-8750b5aba755",
      "data": {
        "type": "Investor",
        "name": "DT Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a03b5e86-cb9f-4b2d-bfc9-d88edf6bb4c9",
      "data": {
        "type": "Investor",
        "name": "Insights Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "adbe3e5c-5fe9-460b-b3c7-fa02dccd525d",
      "data": {
        "type": "Investor",
        "name": "Sands Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "f81159b8-8cff-47c1-9806-95651c2ff414",
      "data": {
        "type": "Investor",
        "name": "Tao Capital Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "cdf0bc7f-54ae-44f5-b230-a4dcda8a9442",
      "data": {
        "type": "Investor",
        "name": "First Round Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 5
      }
    },
    {
      "id": "af604d41-dae0-4bcf-af0a-462be0435848",
      "data": {
        "type": "Investor",
        "name": "Revolution Growth",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "477c3d38-36b3-401e-aa61-9b8776ede2ba",
      "data": {
        "type": "Investor",
        "name": "Shasta Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2b36cc57-7f12-410b-9fd4-05de5bf1b745",
      "data": {
        "type": "Investor",
        "name": "MasterCard",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "c1e35d9c-f53a-4cb9-a13d-bf1015280d3d",
      "data": {
        "type": "Investor",
        "name": "Webb Investment Network",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "cbe91d7c-fff3-4060-bb6f-11a9a75fe1dc",
      "data": {
        "type": "Investor",
        "name": "Silver Lake Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "ff32e377-ad41-4fd5-8644-5600a4603c92",
      "data": {
        "type": "Investor",
        "name": "China Construction Bank",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "22f6b440-00ed-4655-8d51-beb959e58d05",
      "data": {
        "type": "Investor",
        "name": "ClalTech",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7db3ea62-a752-472c-97b8-259f361468e2",
      "data": {
        "type": "Investor",
        "name": "Thrive Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 6
      }
    },
    {
      "id": "9550c3de-49d7-4a6a-ae96-858a059bfce1",
      "data": {
        "type": "Investor",
        "name": "Orient Hontai Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "b5d8d208-8b5e-495c-ba40-7bf14ad26e60",
      "data": {
        "type": "Investor",
        "name": "European Founders Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "18d4b585-59ca-4df5-af17-37a561234489",
      "data": {
        "type": "Investor",
        "name": "CDH Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 3
      }
    },
    {
      "id": "fd39d89f-e759-43a7-831e-8d28c4010746",
      "data": {
        "type": "Investor",
        "name": "Undisclosed",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "dfb3e544-7b43-498a-b4d0-17c0f565a8b8",
      "data": {
        "type": "Investor",
        "name": "PremjiInvest",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "a93eca05-8114-47b6-8be4-573bae39c0fc",
      "data": {
        "type": "Investor",
        "name": "Ceyuan Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "d53f31d1-3d35-47f1-829f-2a6326e428c1",
      "data": {
        "type": "Investor",
        "name": "Ajinomoto",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2d652640-7fa0-4b13-b85d-44fc5bafca7e",
      "data": {
        "type": "Investor",
        "name": "Passion Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "7a19f1a0-f9c3-44cc-b532-376d9ffb63ec",
      "data": {
        "type": "Investor",
        "name": "China Internet Investment Fund",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "732755f2-02e0-473f-af60-440f5d07a8b2",
      "data": {
        "type": "Investor",
        "name": "TMT Investments",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "2f20e509-784f-4af8-a31a-d83b48ae3acc",
      "data": {
        "type": "Investor",
        "name": "Formation Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "8d775572-cfe8-4fb5-b002-dc1f0762f0aa",
      "data": {
        "type": "Investor",
        "name": "Franklin Square",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "efd07cf4-286c-4dd1-a7ad-6d52295d181b",
      "data": {
        "type": "Investor",
        "name": "Oceanwide Holdings",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "35c5421c-e372-40ef-a8dd-6ce5dac897b8",
      "data": {
        "type": "Investor",
        "name": "Horizons Ventures",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 2
      }
    },
    {
      "id": "bf4f40f5-a32f-4c6d-b48d-42c1f4fd3166",
      "data": {
        "type": "Investor",
        "name": "Venture51",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "88890e75-8051-4f8d-b865-650bf3ddcfee",
      "data": {
        "type": "Investor",
        "name": "iNovia Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "696cceff-faf7-4041-8a68-3783b9236057",
      "data": {
        "type": "Investor",
        "name": "Scale Venture Partners",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "291307f9-b16f-4ecb-b823-c5362939132f",
      "data": {
        "type": "Investor",
        "name": "VentureHealth",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "652afc2c-d78f-4e1b-a12d-3f927877637d",
      "data": {
        "type": "Investor",
        "name": "Dark Horse Technology Group",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    },
    {
      "id": "883280de-a71e-486b-aef2-c8c033f7529f",
      "data": {
        "type": "Investor",
        "name": "Blue Lake Capital",
        "description": null,
        "image": null,
        "reference": null,
        "properties": {},
        "degree": 1
      }
    }
  ],
  "edges": [
    {
      "id": "2f028aa6-c2a6-491a-990a-9416cf091e88",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c9835829-e478-432e-b644-e7c26b794b0d",
      "target": "81be3714-dc51-472a-a90b-c5804aeffe16"
    },
    {
      "id": "331cc94d-26b5-4eae-bc4c-3aaa9ff6346c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "13acb4b1-84a9-4f3b-a889-9695bdd2f5bb",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "75bae3ae-8756-4ecb-99d8-fb906a3a36a6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "17b96d28-b6df-4caa-949e-b7aa467aa436",
      "target": "bd6d23ea-967c-4dfc-95b8-fa7e0ce73ff8"
    },
    {
      "id": "3cde8dc8-02c7-4032-8e9c-6253cbc82131",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7eeaa744-11c3-4230-a3e5-ecfa8677b87a",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "3c5c8dda-979d-4205-b498-48c539489c97",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8d12c06c-d905-4bd5-882d-f1080c630e66",
      "target": "4875a289-85dd-44d1-b790-a6e6d48de2aa"
    },
    {
      "id": "fbf0236c-c0fd-4353-8f2c-74b7a542a0d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f8824bd0-99c2-40df-8db7-ff369547ead8",
      "target": "b930f90a-c554-41b7-ac7b-933558e21b9c"
    },
    {
      "id": "590faa74-8da0-4a36-afc0-486ba7297130",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "947354e7-3823-49c5-b5f1-e3609b465487",
      "target": "6d915a0a-0e83-4337-98e2-3b8b63d44611"
    },
    {
      "id": "245e0847-9bd4-4d39-b04a-baaf3bf61272",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "89ce3789-0428-44da-9823-47897745615c",
      "target": "84ecfde3-5f13-4069-8b89-29c6f293ae1b"
    },
    {
      "id": "29af3f13-d85e-4546-946a-7eb9d4841dd9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a6532e8-dfab-461c-8b7c-ac532dae194e",
      "target": "320ca84c-b4e8-4446-96e2-43afb5529266"
    },
    {
      "id": "4081475b-afe0-4ea4-9bc2-fde501dac403",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4235532e-1f90-4222-b799-e50d25194326",
      "target": "ef4cd919-366d-4cb7-88e9-b60c2fa04221"
    },
    {
      "id": "a0044a6f-51a9-4c1e-b488-ceb54716961d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "63371595-93f3-42c2-aee8-2a487612d88e",
      "target": "f48e1220-1352-42c4-bdcb-cc91e02b7640"
    },
    {
      "id": "b4083742-77db-43c5-b18d-da0a7dee2437",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "122a0e2f-cb41-4c30-808e-820e3594e71c",
      "target": "46dd3259-91c5-4bbc-aa7a-b6a55275800f"
    },
    {
      "id": "383f984d-6d10-4f3a-b4cd-7e61be033ae7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "100df992-d65d-4997-b64c-950d4c2a489b",
      "target": "fa66e6c9-8df4-4ce1-a74f-1bb9134906c2"
    },
    {
      "id": "7e3fc0a9-90b4-4eab-8062-ee06a607312f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "50e8a9df-ae86-4349-8155-acfd0ee32e6c",
      "target": "f19ad04c-150b-4e94-804b-90c30c3d73ec"
    },
    {
      "id": "039ca02e-c8b5-4596-9666-8087d7f39158",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24f47c94-80d0-410d-8823-386b4b1f57a4",
      "target": "1931627b-ab96-4461-9fee-819d96f194c1"
    },
    {
      "id": "6bb3013d-f646-472f-a92c-6f88b8c4e859",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b1f572eb-a2c4-4f90-87a4-112e5fcb1a0c",
      "target": "a379ad3b-1b96-4602-80c0-f0ae5144a183"
    },
    {
      "id": "ebd90417-b0d9-4e67-b21b-10da2edee8a0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "240cd8e9-51b5-4ecf-85f6-efc55cd9591c",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "a06dca83-1165-4a90-a47d-362bee8ed9f2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f3d9027-7fd5-492b-9699-4bd54a3673fc",
      "target": "b819cb40-d171-4afd-b960-8240bb31ee01"
    },
    {
      "id": "75f6bada-ee5a-44c9-879b-eea228138bc8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ac74b43e-4221-4756-a790-bd3333d427e2",
      "target": "d7cfb938-0b60-4d4f-aa42-e29226ed3fbf"
    },
    {
      "id": "e786bbea-216d-4c36-ae35-8d19e7f01b50",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "54fd9a1c-7382-4e3d-acc6-ad9c1b30811a",
      "target": "37870f2d-ed7e-4298-a699-15c2f49d5312"
    },
    {
      "id": "069859c0-7311-47a3-829a-e18760fc8858",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7dc155e4-477b-46d5-ad4b-bfb40a120bf1",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "528bc04a-6b2b-4e1f-b755-ba9d784cb538",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "50e8a9df-ae86-4349-8155-acfd0ee32e6c",
      "target": "6f801393-04ad-406d-8166-68b43c92b514"
    },
    {
      "id": "cf429cb3-58c8-4015-b777-fadbbf4ff4d2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7ff5d607-4d2f-4ff9-bf65-fc8a7a9fb6d1",
      "target": "b5d8d208-8b5e-495c-ba40-7bf14ad26e60"
    },
    {
      "id": "1b3904f6-18d8-4e62-8d5b-78a82f6a4831",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd20c501-68c6-4286-b957-d6b50b13b564",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "eff5152f-704d-4e59-89d5-205faca9d8ea",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5b8c0ea7-e21d-42d5-bd0f-10ff14aa8334",
      "target": "3bea3991-afee-4aa3-a404-283bb778097d"
    },
    {
      "id": "4a48ced9-cf6a-48b1-9cc3-ce9946f759cc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e27a5ac-efdc-4750-be3f-9d404ea9b31f",
      "target": "0da7b685-2b55-44ad-b7b1-081acccd9752"
    },
    {
      "id": "8fa82425-d56f-4095-aab9-6851f0293f60",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8d989794-ac65-4d8e-bf23-8b573ed562e4",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "adba33a1-c441-40a7-9af4-f3c753fa6547",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e692c214-6f18-4efc-b928-a26642799957",
      "target": "f5243f40-93fb-4ac0-b92f-c5e5cb19cfd6"
    },
    {
      "id": "26267a8e-08d3-4d49-8263-8b45b4c89680",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d2bbc6f3-8c7e-444a-b7c6-31f8a1ac4470",
      "target": "f8dca991-48d3-4dae-a84e-1f4e6b7c4206"
    },
    {
      "id": "3ceac5cf-c5da-4a74-8597-ef387af4f395",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "93adb624-7b40-4c31-b59b-16e682fd3158",
      "target": "b8167897-3a74-4d12-8bdd-b3dfc79cdde2"
    },
    {
      "id": "73d7f3b8-5bae-442d-891d-53e08e9ea96f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8ba72e8-0aaf-4d4e-a8e6-60720f3b38b7",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "c4df4ea7-967a-4d67-9edc-e1ab7a53bdba",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c62cf018-06ea-4c21-b30e-3127f9eb54c0",
      "target": "840ce1b1-8df6-4b8d-9196-873adbee2e15"
    },
    {
      "id": "acdb32e5-4187-42f1-9d40-1a54563b7bbf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bbed86e7-d143-44f3-ad00-73ae341ee190",
      "target": "48914a82-fa51-4c89-b2ea-c4647a202319"
    },
    {
      "id": "3beadd8a-e0e3-408d-a66b-bffd2bdc435e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f1ba8142-9743-4118-bfd0-01a778dc3c59",
      "target": "8f898648-5692-4d44-b2d7-be4b9a723f76"
    },
    {
      "id": "6c1ddcaf-83e9-4d9b-a705-707983dd29cf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "96c707a1-8786-4251-8f2f-bd9521479388",
      "target": "18185970-49a1-4415-89ef-a5e7148ec804"
    },
    {
      "id": "652b4cae-96d5-4647-915d-3dbbfdae5022",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "80010e00-e158-4d86-9c1d-477d3897c0c9",
      "target": "320ca84c-b4e8-4446-96e2-43afb5529266"
    },
    {
      "id": "daa0f1c5-233d-4fec-b62b-662d86bd68eb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "073eecc9-57e0-4260-a364-bb3a6f1d4269",
      "target": "18185970-49a1-4415-89ef-a5e7148ec804"
    },
    {
      "id": "60d4e872-0e86-450f-ad03-75fe7d9b08a4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fd5cafaa-6c73-4259-9503-0f348649a3a1",
      "target": "2b253c21-2fdf-4b7d-aff7-a787e9a80485"
    },
    {
      "id": "e36903c2-1f11-48bb-8996-31ca8f1e786e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f677575d-9276-4dc0-bb0c-f716fe1dcea3",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "25250fa1-a050-4166-ac97-903a18f4e47b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cd0ee637-6276-4fb1-8d0e-25fdf752fef8",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "79b6f456-745a-4c20-84ae-d09a26d6d6d9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1889c11e-4f31-4f1e-b2c4-6434f23849b6",
      "target": "49336bf1-3f56-4de5-a119-ba821d418b57"
    },
    {
      "id": "baf8a589-bfcb-47db-9563-26104bb54f7c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3bc21ecd-15f5-4301-940e-69367b95f91a",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "0c8deae7-d39f-4eb7-82e6-ee8a0ace132c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f3d9027-7fd5-492b-9699-4bd54a3673fc",
      "target": "fdd35941-6205-4313-b05a-ea5a255ca963"
    },
    {
      "id": "438d1be3-20b5-492f-ab38-e008b726e8b8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3bf6ca2b-357f-4506-9d56-761b7619ba32",
      "target": "b1b36864-cac5-46a3-bfd5-6b58f33fe1bd"
    },
    {
      "id": "d0f03d2c-61dd-4376-aebf-5b1a1c15c46f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "45582e96-c54c-40f4-80bf-e929f5b81dbe",
      "target": "7be3c93d-c7dd-4629-9b48-a9c51cc12692"
    },
    {
      "id": "d60c9ea5-2de8-48a2-be14-6217f8085d4a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e692c214-6f18-4efc-b928-a26642799957",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "9b658495-6a7c-4c86-8e11-bafdfa4cfcd1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c3fa8315-aa75-4bcc-be83-699d89a62a86",
      "target": "48914a82-fa51-4c89-b2ea-c4647a202319"
    },
    {
      "id": "2e6b5eb3-9238-400b-aa78-e8c03d00e2a9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24fd7dea-fed7-45e1-997f-03f0679b4bdf",
      "target": "02133eef-a84d-466f-b577-1b693e082699"
    },
    {
      "id": "4b566707-6901-47eb-b766-f93af20efc3b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bf341a3d-326f-4564-a118-5efe79f53e19",
      "target": "423b88cd-bbf5-4fa2-8463-d16c06a5286c"
    },
    {
      "id": "0a2d4b99-b40e-4061-9364-fe2e9cacd8c7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d65efd39-d28f-4b25-9ec5-be8fc8de6a35",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "4dd219fd-e04b-41c6-abb9-62bdefd8a59f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "aa9e49d5-3bb2-4135-9d1b-dc4f7fd0e44f",
      "target": "fcb445b3-e2d5-4c68-b3c5-73ccda39a06e"
    },
    {
      "id": "895b6c37-b3be-4bbf-a120-b3c97093c623",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "314aaa1d-c920-4e90-a42b-991bf6bcee91",
      "target": "eeee0937-10e0-4586-91c2-67ca462f788f"
    },
    {
      "id": "9cd72c4e-4b51-4ffe-a88d-565245f55ce5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "02f32b03-0703-4d8e-894e-efacfad8cbed",
      "target": "c08ae974-5452-490e-9ac6-97a5fcd4bb91"
    },
    {
      "id": "23e8fd2e-21a6-44cc-bfa0-a3183b660eeb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "69fd1220-77b6-4d1b-99cb-76a93e84d0ad",
      "target": "104871cd-42e4-423d-ba76-2198bf771c4c"
    },
    {
      "id": "739404a0-5326-4869-b8e0-2497c42e55dd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b7659cba-8d5e-462f-9ab3-347cb749738e",
      "target": "dd2b26ea-8985-4f73-a1de-04e8c8f02cdc"
    },
    {
      "id": "ac33c9bb-166f-49b0-9ab6-ef737e29c9a8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c0b732d7-388c-403d-b520-6858c5903bd4",
      "target": "37b0dead-dcaf-4650-b892-a4fc76038e12"
    },
    {
      "id": "28a27bac-e5ea-4ec5-b69b-68b8a1171ee7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "275e66ee-02e4-4085-a5ff-7b0b7dac5cdc",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "b2be6e26-923b-48e7-af62-17d78b7f4877",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe12bffe-7408-425b-9dc4-c5ff28606f54",
      "target": "e6e04211-334d-4779-85d1-ac760b709219"
    },
    {
      "id": "1b7c3408-a902-4b87-84e1-77c9c2b53e6d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24524899-707d-477f-8b5c-27887b736fe5",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "e8feaae6-261c-43e6-934b-bba54b0347f1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "628738c8-d9f5-4c70-9422-581c498224c9",
      "target": "feca77d2-14f7-46f6-8233-db5f9e459d17"
    },
    {
      "id": "f4331d16-715e-4283-8fdd-d327e9326eb1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "30345443-4007-405c-9f52-6fbd826d7fa6",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "76d4d168-00b0-49fd-9997-c7bfad390b2b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d6c7cf8f-7a9c-4fc2-9fab-b11b482189de",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "3e3d0458-6590-4afd-a730-06922a605ab9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0fa174b0-5013-4d29-9fff-075ece5c72bf",
      "target": "a79106ff-3e11-4b71-8fb7-38b68579228c"
    },
    {
      "id": "eee39e3a-3ebf-4aeb-a46e-88186f1f6cbf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7baa42e4-a0eb-4ed6-84ec-3fbdbcf73985",
      "target": "fd9b2f74-1bd4-4949-b512-a84e08f776dc"
    },
    {
      "id": "91b2057e-341c-4150-b9ca-68173b60c97e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "aec03ac9-fc1a-4198-9865-100c59cf4eb3",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "7b6f21ee-44dc-4568-9e66-cfccbe195986",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2ed0b4c6-2158-4b3e-a5c6-e04bccbf6584",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "165e9fac-faa4-4cd3-a88d-849cf1235e34",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5912d4cc-80de-4fa8-aa4c-ba0513bf409f",
      "target": "c8ac58aa-a0a8-422c-b8e3-49ada40674df"
    },
    {
      "id": "422577a6-7bd2-4b3f-80a3-a8d73f056864",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8aa0182-1afe-4bbd-b355-110264135f14",
      "target": "a0d87cef-fc02-4288-a214-276426279ffe"
    },
    {
      "id": "1ac5555e-3e50-4a5e-b00f-04128549df27",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ed758ecd-534d-42aa-82b6-c0baf3a7d8b5",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "cc3cb1e2-95ad-4f07-8550-f8028f34ee8d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8991063-636b-463c-aff6-1185836eddda",
      "target": "1ed35ca2-f295-44cd-a0bc-d637810180d5"
    },
    {
      "id": "dc9cd078-f484-4266-8ad4-da5dd6f828e2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "adb0c5fa-92c8-45cf-ab55-a6a674c9cb3c",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "92d05b68-ae97-4947-a207-3d09584e9b1b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9328691d-5b23-4133-b6f6-d7bd136b121c",
      "target": "2c7fe19a-cf14-4dae-8172-9cb579909848"
    },
    {
      "id": "4732172e-8b24-4bc4-acec-787a4350d981",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "901943ce-5024-423c-9f52-886bf795b25d",
      "target": "022b93b8-02e7-46c0-a08a-fe02a343d3df"
    },
    {
      "id": "fedd2f53-6aa2-4039-ab18-4dbe7a5eda34",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4ad846c6-2692-4b3b-85c4-cdc0cc9bedf3",
      "target": "bb059018-2fcb-426a-b59a-d518fcb5a199"
    },
    {
      "id": "9bcffae4-c998-4ba3-96a8-e2765cd279e9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d1f95e8d-b1d3-45c6-a24b-496e2ef6c455",
      "target": "2c7fe19a-cf14-4dae-8172-9cb579909848"
    },
    {
      "id": "3acab74d-afeb-4514-b744-79ac52095a44",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7bd352c4-7bb2-4af2-bc38-740c70f3b15b",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "97821b05-8923-4f02-8ba2-96e1a76b2c7b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c70cee58-e586-420a-94cd-54adf1d8354f",
      "target": "ec9fdb50-0215-498a-88d6-86076319c6d1"
    },
    {
      "id": "2403dd87-b1ac-481c-8fde-8b75279e736f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f4774af-fcc1-4fd3-9dc6-58511e7d0d35",
      "target": "145867ca-a62d-47dc-9132-1424d287866c"
    },
    {
      "id": "284f6fee-f89e-4edd-a4d9-0750868e400e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e86ba7f-ea5a-4a1e-bcc3-c2587e04889f",
      "target": "a1bac567-a747-499b-adc4-6c41c1e16958"
    },
    {
      "id": "5b85517e-c87e-4620-8183-8bd99de8727a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5c0552a2-5807-4724-9185-73d1432b7bb9",
      "target": "07b6b963-b08e-4946-b788-7321a0811e4f"
    },
    {
      "id": "6c81f506-dba9-4593-86f0-dcfe36e4f1a4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bd82f509-9eb3-483f-a861-7b962a10b332",
      "target": "e91b3a99-b75a-4c28-b57a-a37c503bb5be"
    },
    {
      "id": "0cfa2aee-7659-4577-939f-7a521e4063e7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "13acb4b1-84a9-4f3b-a889-9695bdd2f5bb",
      "target": "887c9b44-c297-4063-8ed3-28a73c391c13"
    },
    {
      "id": "51de5b74-87f0-4d7e-8a65-8e24b7d1fce1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "84ca26ce-4766-44fc-812e-c1d0bc3e897b",
      "target": "6f2a7d2c-5a77-4425-a492-b4ce2848b806"
    },
    {
      "id": "34e3920a-8790-4cba-9c3a-4c3878da4a83",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3befff07-86fe-4546-959b-01819a409bbd",
      "target": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711"
    },
    {
      "id": "ddb49842-d74f-40f8-b570-774bda8c04b1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ae4df9d2-9daf-4e79-93a2-2f9a36cf347c",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "786af7e4-7f30-4c29-99e6-a4e3fb88e5f5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ea3b1c9c-3065-47b9-a5a9-d6e6cf8f6c89",
      "target": "b930f90a-c554-41b7-ac7b-933558e21b9c"
    },
    {
      "id": "e79a00a2-e5e9-42b3-9e97-5d87267e6724",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2ca9f5f4-9b36-4297-99ad-30fb56df51e1",
      "target": "42b0ae2d-6cac-4243-b6e2-37425aa903e9"
    },
    {
      "id": "6faefa74-0e4f-4539-8d98-c78fd90b5d77",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b309cfb4-3234-4975-9b94-b42aea1ea4b6",
      "target": "0d52a4d8-470d-4a77-bc80-970f64e1f3c1"
    },
    {
      "id": "b30d863e-f545-4519-9a54-b21f61322b1c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c86156c1-42b6-42b4-a7db-3431e2b648df",
      "target": "cf15e1d6-2ff9-4bd2-bf1c-32bf9306cbc8"
    },
    {
      "id": "52d2504b-1e4a-4762-adfe-b3ce86d91951",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe17cdf6-95ac-41b2-9b46-2e3f790cf967",
      "target": "49336bf1-3f56-4de5-a119-ba821d418b57"
    },
    {
      "id": "62482feb-a604-4f9c-9c74-9012eb258bc9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d5dca4db-48f8-42e6-9cb1-38a90f516f1a",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "ed7979a5-6d3e-4482-8a54-decd7d89751c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "12f7c175-2e79-4993-a295-6f187be54475",
      "target": "5379fa02-25e4-4971-b918-861e9c0f66de"
    },
    {
      "id": "dec46a16-cbce-4900-a574-6b9391b451b9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3602f7bc-9a6f-4aed-93bf-d11848d99f77",
      "target": "7003c56b-ab1e-45fe-ab16-969335c4e595"
    },
    {
      "id": "3c3dc227-02c2-4f49-b708-3f9f19449dd9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ba547d6e-af85-4e75-8443-1c5b877a2d5e",
      "target": "615e3fd7-1d32-4ec3-aa57-57758a40f836"
    },
    {
      "id": "ed4b648c-5db6-4363-a5c3-8a6a0fcd538f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d29b5c0b-d5f0-4143-a4e1-7a81f5c75a9a",
      "target": "c5a6486b-a6a7-4f0a-98e9-de54345dd37d"
    },
    {
      "id": "ad117fe0-b296-416c-9341-9d83f3efca97",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c4cc767a-409d-4453-9121-38b916b19737",
      "target": "11539712-ab04-4bf2-b2ed-a241f352d98f"
    },
    {
      "id": "5cc1dc01-bf54-4a2a-99a2-86403a39f617",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5e63785e-1ba8-4dd1-8127-5e1c1867269d",
      "target": "feabb0a6-8fcf-41fc-884d-e967ecb15185"
    },
    {
      "id": "92d36b5c-b9ec-405c-bf90-1168dc83e132",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ef9babda-8826-4982-b057-3730298f9861",
      "target": "106e349b-7453-4eef-bfdf-50970a77876b"
    },
    {
      "id": "c331ba77-aa2f-4463-b8a2-3c484fedaf66",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2dffe4c4-85fc-45cf-857c-4088853f1fcf",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "a5cb0655-9d7a-4d24-b644-5ad40a33c00f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b286c9b3-6323-47b0-92e5-e6f80b4ac7a5",
      "target": "fc67fd7b-1f1e-41ee-b212-1d604438da10"
    },
    {
      "id": "7d7c6f05-f02c-4c61-baf6-67dbcd733e64",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "df3dd182-4c18-42a0-b812-1e6e13c5dc9e",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "2e2846ca-dd06-4e91-9b4d-b991a65a612e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f8824bd0-99c2-40df-8db7-ff369547ead8",
      "target": "7db3ea62-a752-472c-97b8-259f361468e2"
    },
    {
      "id": "8cf5e5c0-a6d6-4966-af48-88ab30d34189",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0665f990-ccaf-4370-a952-85cc742f0a37",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "fef1400d-bdd4-4f2e-90b9-2b74277a916d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "14c15e25-cfc2-4ebd-a8ba-cb5956a0d721",
      "target": "6cf2de49-bee8-4a56-a23d-d4fac927e78c"
    },
    {
      "id": "d4cb4a7f-e3ae-4863-811f-792cd5f04a11",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "324d6dab-41c0-4e79-a336-a2936d7d414a",
      "target": "4caff022-1bea-4193-b8f4-bff549a87de0"
    },
    {
      "id": "f22639f9-c4c0-4dd4-8af9-237aba0c0bcc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5bb08642-7ba4-4435-b0b5-16364c270aba",
      "target": "8774b975-8813-4fe5-9f14-1131e04c9e58"
    },
    {
      "id": "6598391e-bad4-4005-8bf6-65570938f26b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a76e868a-cb4b-48df-8aab-413c84aea198",
      "target": "6ebfaf8a-c49b-4dae-966b-5b98ecf0845f"
    },
    {
      "id": "ca12ba69-fbbb-4c4b-af50-3b9780c996d9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2309158e-ffc0-4a41-984e-35eefdc54be5",
      "target": "3dad8718-1857-45be-9849-c057241d1360"
    },
    {
      "id": "6986e1f4-1e7a-4e6a-9a3c-41637567a05a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "43a75144-7d51-4ffc-9bbb-e7ad0dec43eb",
      "target": "2e36a227-3dec-456a-b4a7-e73ecc64beba"
    },
    {
      "id": "557cd50b-99da-4392-ac85-225a694711ba",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "42ad8250-8d9e-4345-9314-dffb5f15c396",
      "target": "ce6ecfe2-50d9-40a7-b298-b8030e067594"
    },
    {
      "id": "825e5c56-7927-4be7-ad8a-198014896f70",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "21d3c45e-1492-4649-8a5c-a4f621f776e9",
      "target": "d150e50c-e4bb-4da7-9c2a-f3b6bc060fca"
    },
    {
      "id": "33a3ef0c-b38d-4834-b4be-01a610db025e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9488e791-1fc4-4f54-824d-61465a0dbbf6",
      "target": "bf4f40f5-a32f-4c6d-b48d-42c1f4fd3166"
    },
    {
      "id": "63490a20-1a84-4471-82c8-3f14f9f5d157",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "30c97b3d-96ff-4f35-bdd8-4a28204c92d6",
      "target": "830d5985-d0e0-4162-8903-4f93ff3b9e5b"
    },
    {
      "id": "d8fb0021-2afa-4e01-b39b-a955c321170e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4f5e5b02-533c-4a9d-bf46-ce78a433b03f",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "38667554-4a63-4b90-8e12-51eda4905408",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "947354e7-3823-49c5-b5f1-e3609b465487",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "ea236e8b-70f0-49e8-a950-9898d359e07a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e27a5ac-efdc-4750-be3f-9d404ea9b31f",
      "target": "a79106ff-3e11-4b71-8fb7-38b68579228c"
    },
    {
      "id": "06fdd6a5-a0b0-4167-96cc-6cf845f9b81b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "12f7c175-2e79-4993-a295-6f187be54475",
      "target": "99a18d98-36b5-46fc-8f0b-20507484e76e"
    },
    {
      "id": "ac0be8a5-5bff-4463-bf93-9f4bfab7251f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ee6220a6-c0d0-49de-a88c-af4bf8d5d8d0",
      "target": "3cf6c5de-fb7a-4272-96c3-b2cdc46a15e2"
    },
    {
      "id": "5e63fea3-10cc-4891-887e-d00f3d54877b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d29b5c0b-d5f0-4143-a4e1-7a81f5c75a9a",
      "target": "72b09f8f-45e3-4bea-97cb-6fed78d97b02"
    },
    {
      "id": "6604162d-8f30-4a00-bfdf-afafade7d425",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cdaa3396-2705-4691-a4f5-d20d8baf81a1",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "775922a9-520e-4043-bf84-ee32d02b1f03",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b26dc4d7-ee4c-4651-b555-25abd4fbce42",
      "target": "33f94cec-32a6-4780-bf6f-8ef54226d846"
    },
    {
      "id": "dcad2f44-b4aa-4c5a-85b4-3e77a1cd0387",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ae0271fd-9d12-4eae-b282-11017aefd32c",
      "target": "6615d50a-dd51-4c8a-ac8a-2b43a9e80246"
    },
    {
      "id": "fcd60945-6844-498a-8d1b-cefd01be5ced",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5c1416bc-96e2-430c-9630-0808a1d8cdc3",
      "target": "6065769c-9eb1-4e9f-a392-a76bfa811563"
    },
    {
      "id": "29b8fc0f-c53e-4032-a768-4bae85afb358",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b71913d-fef4-422b-b086-862ba35ab1c4",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "71d5ee65-2db8-45d5-83e6-ba4ff01cc678",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e4ff2adf-2fa9-4ad4-8953-d551bb3c5d62",
      "target": "22f6b440-00ed-4655-8d51-beb959e58d05"
    },
    {
      "id": "cb1fa129-74e6-4cea-8505-d9f269156ce1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "93d9bcb9-7815-4463-8025-0f76320b3a72",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "0d63c9ee-a048-4781-98ee-ac7a3dcb5a21",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2a9cbcb8-6008-46f6-9712-cb5246a356de",
      "target": "db76de8a-63eb-4342-bd62-860da9170520"
    },
    {
      "id": "a7ac8624-4461-482b-8f37-f939ea101b98",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b0a2bdfd-f536-4003-aeb8-59af746821a7",
      "target": "50370ece-3841-41eb-b90a-1c827e160dd5"
    },
    {
      "id": "1a9f1b0f-566c-45ab-84ed-9ba8b9d520e3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9227406e-58ba-4133-a0ed-adccf128a9f0",
      "target": "07770759-0f2e-4336-a211-b4f55baa1054"
    },
    {
      "id": "2ca6f88a-3686-4ddd-bebb-8c9c5af2015a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "64b3645d-500a-4543-9d68-11de7f3243fc",
      "target": "69ca94a2-1703-4e64-8356-f2c750e23f90"
    },
    {
      "id": "0be0fae6-878f-4332-a893-020cd9251a4e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "54fd9a1c-7382-4e3d-acc6-ad9c1b30811a",
      "target": "48030f5c-60e6-4718-b84d-7a54f3fc34cc"
    },
    {
      "id": "19693d9e-6179-4fd6-b790-136e55c95c28",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ae25cb27-0e52-4daf-9519-3fe5729e79fd",
      "target": "fb484342-4774-4fc1-846a-e1459cb8f472"
    },
    {
      "id": "a0a388dd-cc63-4172-9358-c06e117b37a7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6eb30306-cec2-4b91-bb77-023e0449dc1a",
      "target": "85a8fec3-a8a2-4fbb-8c87-34b7c2bf15f1"
    },
    {
      "id": "c02074e6-3af9-45f0-9800-ef14d7ded775",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "19e283f2-054e-424e-a43d-5719a12b3c0b",
      "target": "106e349b-7453-4eef-bfdf-50970a77876b"
    },
    {
      "id": "c73359f0-7672-4fe8-b3aa-2cd80ace2ab2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dcf0975e-c6b0-4fac-a1db-a7faa8f064d9",
      "target": "91401a27-4e73-4da7-84c5-b6cd7d667ca4"
    },
    {
      "id": "3b9c5821-e45c-450b-afe3-81489f47c248",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7809f78c-59e8-4d30-9496-f7d16b416a3b",
      "target": "550bdee0-1bd6-420d-8f5b-b51b8ac89c35"
    },
    {
      "id": "1c365a49-5314-4537-8398-7d82c5a9151e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9f0c50c6-1314-4186-8018-b667b804dc9d",
      "target": "2f03b7f8-211c-4c9d-93cd-d66b28cf9ab9"
    },
    {
      "id": "8958fc9a-c4fa-4b0e-a1b1-ca75e66484cf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "30c97b3d-96ff-4f35-bdd8-4a28204c92d6",
      "target": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8"
    },
    {
      "id": "2511e790-97ec-4159-9426-d9cf7d1e8305",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "025fe553-9237-469d-80bf-bb1d4903f5b6",
      "target": "e2fd69e3-55ad-43bc-a503-dee049aa67ab"
    },
    {
      "id": "d174ca5e-9ea2-4fd5-98c3-1ee9f6f50763",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a71e95f0-f2ba-45c7-99e5-dc6992fec770",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "d370cb2f-f591-4e9e-b4b6-c5da8387187b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "03a3004d-358e-4d32-aa57-679baa67be02",
      "target": "234384c0-d041-4770-9310-57cf26e7eed2"
    },
    {
      "id": "31d73e3a-3125-4a77-9f27-d3a796e23072",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1f3b85b8-10fb-4b3d-b9f1-6ee6212a030a",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "e3aadaef-bfc5-4f04-baa6-bbd13404f229",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "59ffe682-19c2-4ed1-afa9-5b8f006310fe",
      "target": "6e25937d-8ca4-4e2b-8037-b27d23678a2e"
    },
    {
      "id": "4e3565bf-313e-44fc-9187-25e367171e4d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a4ed064-fcbb-4073-855c-a84480a2204d",
      "target": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8"
    },
    {
      "id": "bc2b8e27-357a-4e8a-8580-da7b7d4979f8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e962c729-6818-4db3-8d6d-abb3a57b6948",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "f9be1293-b58c-4ecc-8a82-597c809b43d7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "66bb42f0-8248-4af1-ada2-9201740209e4",
      "target": "92528557-833d-4a52-b7ac-f2e8c5034722"
    },
    {
      "id": "e4425982-64ae-46f5-bed5-05ef58efada0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a9871e26-e730-4223-a4df-253910bd00d7",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "f912cbb4-f904-49fe-919a-0a430650d562",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b563ac68-2c98-4ec4-9d2f-b28951353a97",
      "target": "efc32bca-bed5-423e-b012-a55a375311b5"
    },
    {
      "id": "2d96fa45-2a3b-4ff7-8914-346f4574c539",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b71913d-fef4-422b-b086-862ba35ab1c4",
      "target": "946d1b1d-07a1-418a-b0db-52f881237945"
    },
    {
      "id": "4edf9b35-64c2-4532-86d5-f9a94cecd4a9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f1ba8142-9743-4118-bfd0-01a778dc3c59",
      "target": "1da704a2-804d-4209-9cd8-1ea57e523f8f"
    },
    {
      "id": "85fb7640-0c43-426c-b427-dfb04d688c97",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3b75ffc1-4bda-4889-b011-b3daceddb513",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "e605fe37-4963-47a7-886a-796a633e8be8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8d12c06c-d905-4bd5-882d-f1080c630e66",
      "target": "07d7bb28-6c45-4ac3-9043-624c151a4632"
    },
    {
      "id": "f119316e-ca80-4b11-aef5-45a5331424ae",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c427ae4-b5fb-4b5d-a4fa-832a9865faf6",
      "target": "6ebfaf8a-c49b-4dae-966b-5b98ecf0845f"
    },
    {
      "id": "1b092f3a-c95e-4880-a805-d422210f9c66",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8991063-636b-463c-aff6-1185836eddda",
      "target": "a9ac20ea-5b76-4827-9da3-815011b0e567"
    },
    {
      "id": "5e6cf2d2-ac39-4fce-ab54-1aa581abdff0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0266f508-64f2-4239-916b-01946cd04f25",
      "target": "18d37df3-8ae9-4402-b21a-9f5389e353a1"
    },
    {
      "id": "0912dbfb-d557-448f-b987-739e95ca2638",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ee21cce0-bec3-42b6-9fb8-612868486015",
      "target": "696cceff-faf7-4041-8a68-3783b9236057"
    },
    {
      "id": "a9678ba8-7a3a-4d57-ab53-c4be7bf556c3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "78465e07-e451-4fee-bc19-8a7f4470b2ed",
      "target": "f3626b22-6b6f-4c30-a631-954bbc9e803f"
    },
    {
      "id": "59f95e60-d88f-472c-bdae-5502a51f8a74",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0be578b1-0206-4eec-8329-592c135bddc6",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "f46902be-1da7-492a-9923-2c58970594f7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e13fb8f-e809-43e9-9917-acb0c224bfb6",
      "target": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8"
    },
    {
      "id": "209d6862-f4c5-4243-b1ad-efa9e884058a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "84ca26ce-4766-44fc-812e-c1d0bc3e897b",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "fcb04040-031f-43df-8106-33451020b902",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7eeaa744-11c3-4230-a3e5-ecfa8677b87a",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "d02472c1-07b4-41a7-9f48-fe18a75ee50c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0eebf2c9-72d3-417c-ba40-204090fc975d",
      "target": "49336bf1-3f56-4de5-a119-ba821d418b57"
    },
    {
      "id": "ed9e97e2-605d-49f9-be73-211f784d4221",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9dd69c21-a944-42a1-b1e0-be534030a55a",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "a9cea24b-4ece-45d4-9e53-af4944c6e40e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1344ed94-d948-48ab-bb6a-1c29c3e5520e",
      "target": "f184c5d6-5c64-4b7b-a660-0f709332f24a"
    },
    {
      "id": "8eb1eeec-a40b-4181-ab0e-f69f569db052",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ceec1cc2-9102-4bef-895b-ce5f9b545dbf",
      "target": "b712c5ff-4a42-448c-9609-926d719b831d"
    },
    {
      "id": "1de8a656-de90-4e69-9f76-760d6467d691",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d0cfc2b4-13a5-4a23-acb5-7cf2ff122b9a",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "fac4c3d3-4b5d-4598-aab9-ff87292655f5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7962b95e-7ff3-4817-91dd-20caa6985a5d",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "a8d0d653-2b0a-4a7a-913d-3e4e08a88e00",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1f3b85b8-10fb-4b3d-b9f1-6ee6212a030a",
      "target": "23693336-47a1-450d-9ec9-ce727c0e8551"
    },
    {
      "id": "c7385c06-a354-4a71-86cd-9325a6bb49f8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29944e63-5676-473d-8d43-7bf16ccf6d65",
      "target": "d57ba9ab-7ea0-4d62-881d-99a9b91ec15c"
    },
    {
      "id": "41bdcf2c-73db-4b64-b806-e269c854f4bd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cc1d948d-f8e3-4a55-9acb-faba01e5c41d",
      "target": "452fe423-31ff-4f1b-95f0-c42392c50adb"
    },
    {
      "id": "cacf578c-b66a-460c-ab2b-351c51e464c3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f8824bd0-99c2-40df-8db7-ff369547ead8",
      "target": "acac8623-7773-456f-ad72-68b818265ca0"
    },
    {
      "id": "40920ba9-c4b4-4d6e-9e3c-b4d1264e2404",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ef91165b-efdd-4a15-a860-bf14bd2525a3",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "9e6eef0a-c883-49a6-ab40-abf2b8a57d57",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7ebc4dc1-acc6-4f26-9c83-2df3a38d4747",
      "target": "b0684d66-47c1-46aa-897d-6683ac799618"
    },
    {
      "id": "300b7651-d4fc-49f5-b14a-d44363996544",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "240cd8e9-51b5-4ecf-85f6-efc55cd9591c",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "8fe64151-cdff-44c5-9b07-5cf7cd5a4c52",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "876ea202-405d-46b5-8339-21f169dc0192",
      "target": "9c5b30f5-bdb5-4877-bfd3-5674690689cc"
    },
    {
      "id": "c814f37d-78af-4c0b-95b0-065142f6d835",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1c0c3120-679c-4f69-9f8f-c5133083c49f",
      "target": "9c45692a-4d48-40c4-8e6a-ce99312a1bfc"
    },
    {
      "id": "77de1620-63f2-49ef-8fa2-191bc8032203",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1bdef672-51a4-4803-954f-ac9e4765e7fe",
      "target": "b930f90a-c554-41b7-ac7b-933558e21b9c"
    },
    {
      "id": "e9dea554-fd0c-4018-9223-924f1e32f124",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "95a837a9-ac33-4fda-95f0-21f0d7636d85",
      "target": "9b4b6115-46dc-4aa2-afd8-a478d35637c3"
    },
    {
      "id": "1227ddc6-d1b9-4ede-9cfa-13445132e0f7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0989c9c6-9a04-4df4-b20c-a65af39af17e",
      "target": "876c3586-b34f-4f7c-bd4b-f49c425b7be3"
    },
    {
      "id": "f660d082-236a-4e67-8466-1ff36f75a218",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1d3df9a6-9559-4b2c-a85f-fbb50de75e2d",
      "target": "0fcd668f-c6f8-4f8d-bec7-4a31ce543a84"
    },
    {
      "id": "954f1378-4cf3-4a9f-bc61-7b8d36d3c19d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f4774af-fcc1-4fd3-9dc6-58511e7d0d35",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "ea80da51-d5d0-48db-8644-139772695f78",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "db07b2b7-c198-4ee6-8de7-aac5ef918907",
      "target": "9b0de91a-8766-437d-a72f-a06e2d88853c"
    },
    {
      "id": "31f1cd0e-ea89-4f14-a4f7-1eb097831d9c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29f775e5-a87f-4f66-8175-d1b57c0b16ae",
      "target": "4ed0c851-0ff2-49f8-8d65-422270f575ce"
    },
    {
      "id": "6c58185a-2f8f-4855-83fb-d2205e1e9d02",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "780b4b7f-40fa-4924-a55c-0fd4998d32f9",
      "target": "9550c3de-49d7-4a6a-ae96-858a059bfce1"
    },
    {
      "id": "bac0dc96-e56d-4cee-92ed-f1acdec32dc6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0e6d336d-2866-4217-95f8-62979f825b36",
      "target": "72b09f8f-45e3-4bea-97cb-6fed78d97b02"
    },
    {
      "id": "1e0e64e6-07ae-4c71-a827-c851cb91ac1b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7dc155e4-477b-46d5-ad4b-bfb40a120bf1",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "ef3cd64a-ea49-4870-9d2f-8f2c597ab4e0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0b235399-a2b0-44a9-aeab-2b643c2875f0",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "64d7d1a9-c12a-44b7-90c1-e643510671c5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ae25cb27-0e52-4daf-9519-3fe5729e79fd",
      "target": "84351392-f2da-4e3f-a341-0c701b88bced"
    },
    {
      "id": "cbbe170c-dc93-4a3b-bd07-d3b9d378ad8f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b563ac68-2c98-4ec4-9d2f-b28951353a97",
      "target": "8c121e72-809a-4359-bfda-1e6b0d6dbc42"
    },
    {
      "id": "2882ae4b-1cca-4365-a150-0d53c30bfc78",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "876ea202-405d-46b5-8339-21f169dc0192",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "63745564-402c-40bc-91d1-3a70c19e2ea1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "992a6b2e-897b-4e21-a729-e10547f22e3d",
      "target": "e91b6b4a-ab12-47b3-ac2d-53effca5c7cc"
    },
    {
      "id": "73c017b3-586a-4d21-9c54-ed324b7ea743",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "78465e07-e451-4fee-bc19-8a7f4470b2ed",
      "target": "f612f131-c821-4c79-873b-cc14e9a44981"
    },
    {
      "id": "a1dfc700-39a1-4e04-ab25-e734549296b7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "93d9bcb9-7815-4463-8025-0f76320b3a72",
      "target": "883280de-a71e-486b-aef2-c8c033f7529f"
    },
    {
      "id": "1f8fca88-a598-4a66-8c5c-95e022a7dfa7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "db07b2b7-c198-4ee6-8de7-aac5ef918907",
      "target": "3d8c769f-8fd4-445d-8726-1ecbdce74ac0"
    },
    {
      "id": "943408ea-de88-48dd-8f17-c972cc61f123",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "660299b9-7bdc-4392-8a82-4a6285d73167",
      "target": "8774b975-8813-4fe5-9f14-1131e04c9e58"
    },
    {
      "id": "ba9b4a77-edcc-4154-aecf-9c93d9a3f3a1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b6dfd0ad-c76e-4d98-9166-4fe62e6094e6",
      "target": "593836a7-af6c-4f59-8d53-37bc3612e4d0"
    },
    {
      "id": "8e71b5e5-fc46-4215-bc98-70ea467ab7a0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8c8611ab-3cdb-476a-bbbf-56213fe68e60",
      "target": "0ebf29f8-8fde-42cc-ba3d-76796a1513a4"
    },
    {
      "id": "0513260f-3717-4e34-85e4-291db8656a20",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a657a180-8498-4ed0-be77-6dd2d8f455f5",
      "target": "f7b645da-aee9-42c1-8e74-577fb8076f22"
    },
    {
      "id": "9e3dd89e-db88-41c6-949e-c46c29df3ee1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "62818a74-7d9c-4217-900d-be4fef18de20",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "e0e867ff-0baa-48a7-bf37-bc638a7b28e0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "40e34763-9aa9-48c3-9cc6-892e0a5f4678",
      "target": "cdcf10af-6671-4720-9a23-ae6d17d87aee"
    },
    {
      "id": "61535a08-28f3-49fe-8114-95037590d552",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ef91165b-efdd-4a15-a860-bf14bd2525a3",
      "target": "2025adcb-2ef2-45ba-b262-ced22fd56936"
    },
    {
      "id": "efdc8c4a-1ed3-48cd-b779-12c301ab04da",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0c3f88ab-94df-45da-b61d-821639fa58b6",
      "target": "145867ca-a62d-47dc-9132-1424d287866c"
    },
    {
      "id": "28245a9c-c2a1-4592-a954-c428051ea927",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "176e8d26-f989-4d4d-8f9c-4fbc71a1fe20",
      "target": "45aa74e3-6830-43ad-b349-3bcb98edd8a9"
    },
    {
      "id": "7967bbd4-58d5-47b9-8ca8-e15789075ff8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dcf0975e-c6b0-4fac-a1db-a7faa8f064d9",
      "target": "12417911-45d7-481f-9704-529f4d299714"
    },
    {
      "id": "490b043a-a6dd-4fdd-a525-456d7b1e3a94",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cdaa3396-2705-4691-a4f5-d20d8baf81a1",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "750b4762-a6ab-423f-b2fa-650ed74f9da3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "700163f4-7cfb-4bf4-a674-12f992fda1a1",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "1d7613fa-c192-4f1e-8ca4-8e9655b82469",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ef91165b-efdd-4a15-a860-bf14bd2525a3",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "c759e819-7d5a-4954-9509-746793f402e5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c4cc767a-409d-4453-9121-38b916b19737",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "03eb6ae6-6989-44df-b4e7-55a0d559f89d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c5c0582c-ad7c-4c13-bb69-8b8781c62906",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "b059b695-5906-47c4-ab26-b9587382079f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "073af219-00cf-4101-b198-63571c1e4bdc",
      "target": "830d5985-d0e0-4162-8903-4f93ff3b9e5b"
    },
    {
      "id": "822318b7-ac3e-4d12-a987-0625155a4e79",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0b118eac-2158-4006-9017-1713c74894c9",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "dc2e73d8-651e-42b4-9e45-3c9c60a91c4f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c156bb21-e68b-4cb2-9427-2151b90f3788",
      "target": "03b7786a-0552-42c8-b28e-fb083df33cf2"
    },
    {
      "id": "016cd8d4-8110-466f-9c53-60003cc2ec28",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c9835829-e478-432e-b644-e7c26b794b0d",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "eb37670d-8027-40f4-8e45-3004501e2071",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a7dc7e54-627e-4282-bf8f-3f3bd6d68949",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "4fa53105-98cc-4953-9019-a765d125c6a5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "629f961f-5de8-4f14-a71d-c03d02d13ac1",
      "target": "933fc378-2d4e-48b2-a457-56fb9e2aa341"
    },
    {
      "id": "5a456428-570f-4332-86b9-d6bb5288639a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a0e9da64-385d-42f1-820f-c5b485a392d2",
      "target": "4c04b02f-f614-4ea7-8192-14be736ab9f0"
    },
    {
      "id": "c0d94d9b-00e3-4cd8-be01-4fe0049be293",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8622747d-791f-4362-bbfa-0f26e2154ebc",
      "target": "a8944eaf-1332-42ff-b295-52276c71439a"
    },
    {
      "id": "0200a749-f837-4157-ae58-6e3753ec94f0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1889c11e-4f31-4f1e-b2c4-6434f23849b6",
      "target": "afc83851-b62c-4b42-aafe-b195e2a22c3d"
    },
    {
      "id": "30d071a2-76c0-4ea4-98e1-c5858ce1cd42",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f091bf9d-b5dc-44d4-acdd-4be427f7bffb",
      "target": "8fb9d263-8bbb-4427-b9fc-399e88c5d504"
    },
    {
      "id": "76005402-2401-4788-9cb1-6afe7305f89f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b309cfb4-3234-4975-9b94-b42aea1ea4b6",
      "target": "5ecdef1c-12da-44b5-800a-7528645cf191"
    },
    {
      "id": "9b722faf-b4e8-46c0-a7ea-e1e30bb4fcfc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "629f961f-5de8-4f14-a71d-c03d02d13ac1",
      "target": "e26d9982-b710-4e6a-956a-fd75460e599a"
    },
    {
      "id": "ba305552-4b99-4f5c-879b-cd04e399a227",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c95b1106-541f-4ebe-8865-84ed594e3f0c",
      "target": "c1505a80-1132-4fc2-8e9e-1f7cbbad9054"
    },
    {
      "id": "9ac8ca67-5fb0-4dce-932d-ee1882f7361b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1e4b74e6-634a-46ec-9a79-c25f9057d830",
      "target": "dc5d05ec-f95d-4cd3-b159-b9e748125739"
    },
    {
      "id": "c636e4e7-9fbf-44d3-820d-cbc8227034d9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "199dc595-ef32-4a39-91b7-2e35e4936377",
      "target": "08f4f061-0650-4739-8a74-cec7ce312bfd"
    },
    {
      "id": "708b48b0-8b88-4aed-8755-749ecf2fb6d7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "23c4ac2e-b19e-47e4-855c-06a1c5af033a",
      "target": "fe203eb6-a449-4068-841b-59502e1ce664"
    },
    {
      "id": "d7724b5d-43f0-4436-bcd5-223d4166ee0f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "40301944-5e3f-40fc-9345-e51e36153f4e",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "b85587d3-d871-490e-afb4-922c3b2d9c92",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5b8c0ea7-e21d-42d5-bd0f-10ff14aa8334",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "5837ba04-fefa-4f79-9000-f3c3d1a45b6c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24fd7dea-fed7-45e1-997f-03f0679b4bdf",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "230d93f0-bbfd-45c9-855b-aed355e4813a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2ec83fd5-52fb-4570-adbb-0980e2c7b6df",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "a8c24aa3-4e8f-4055-b475-1b4c21ce74d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1ca74dfe-e0f3-48db-984e-172de8e3b9ac",
      "target": "c0b37880-fb0d-42bf-b163-8761466545bb"
    },
    {
      "id": "2f659ccc-efb4-4ee4-9d33-bd9d182675f2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b10eba88-df54-4ee2-9c34-6ae63ebdc709",
      "target": "846849cb-a387-414b-8e83-2b67c19c4542"
    },
    {
      "id": "e2843b0a-8765-4de9-b806-868cf5b2fd01",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "51237bae-e942-44bd-ace6-02b552253d85",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "490671ad-d33d-4236-83f8-43ec81ad9b05",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "660299b9-7bdc-4392-8a82-4a6285d73167",
      "target": "6ebfaf8a-c49b-4dae-966b-5b98ecf0845f"
    },
    {
      "id": "edb6229a-9b67-4683-bb8d-4f7897d0b931",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "51237bae-e942-44bd-ace6-02b552253d85",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "b5b79127-ab7e-4aa4-b344-3087666b815f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d6821f01-a685-40ad-877f-e78c6221feab",
      "target": "8d775572-cfe8-4fb5-b002-dc1f0762f0aa"
    },
    {
      "id": "c21019a3-dbbe-468c-8cc7-1cd0a264e667",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cfd674ee-87ea-4223-a221-d89e8d21fe9b",
      "target": "2f20e509-784f-4af8-a31a-d83b48ae3acc"
    },
    {
      "id": "fe84d6a1-f337-435b-9a60-426a0a2d79d6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f4ddf63d-d4b9-4fac-ac6b-686f9ecbfb8f",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "fe30c896-abfb-4295-8b37-5a9b6a4b2710",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "04665a92-f6d7-4a90-b570-1ec2cd0a999c",
      "target": "9c20e64c-2b33-4311-a118-db7a5605fb06"
    },
    {
      "id": "fa820404-9f46-4669-b765-3a576a4c3671",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9525cfb5-845d-4146-b9f9-aae31ece2dcd",
      "target": "c129d99d-8733-45da-9e84-09bc9d45b2e7"
    },
    {
      "id": "590295aa-1022-42ca-ba31-ce83b745efbe",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6602c36e-f371-4b04-b662-000a779f0e65",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "4d7d353f-e306-4546-8702-71d644a94d6a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24f47c94-80d0-410d-8823-386b4b1f57a4",
      "target": "c651561f-d9aa-46ea-ab93-d3c5f93e409a"
    },
    {
      "id": "6178d895-c667-4929-a540-daca7e88fbdb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "018e0cc1-7d11-4945-be9f-bac4d0b7e62c",
      "target": "e36b9542-27ea-4821-b6a0-f6bdf652a918"
    },
    {
      "id": "6dd77010-433e-4f66-b234-085c0d8426da",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1d2cd6a2-c0ed-4b7f-9ded-67bb51411e78",
      "target": "2d652640-7fa0-4b13-b85d-44fc5bafca7e"
    },
    {
      "id": "89b5e25f-b8c9-479e-afd8-712f2c1552e5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2622ea66-8866-4b1a-b42c-73de3fad34ae",
      "target": "e4e2f884-8f9e-4811-82a5-281654bd3579"
    },
    {
      "id": "5a2430a6-a0c7-4757-8e44-99eb16736a4c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f246f7bb-6de8-4f7e-a3e1-407e51da7dfe",
      "target": "b91301db-168c-4f34-9c25-3da656536db7"
    },
    {
      "id": "e81b196b-2753-458f-9b12-432916fdc5bc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "af833b4c-4d1a-4d27-8c68-ececb90c954b",
      "target": "395df62a-1691-4351-a38a-abead9605b7e"
    },
    {
      "id": "defe9de7-530f-4f27-af37-4dc24feb0662",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9f97bb7c-2f01-40f0-bcc2-8bb20bd93e21",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "ec7ccfd7-98b0-4ce6-af39-cc84b5a88ecd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e35f0c96-7e0f-42d0-b5aa-6a2a89adb9ca",
      "target": "46e5e478-8d79-47d0-acc3-2dca8b941064"
    },
    {
      "id": "b692aa39-bc8d-47c7-aa71-c96f80ff3b7d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4f5e5b02-533c-4a9d-bf46-ce78a433b03f",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "65f032b9-a253-4865-a06b-ce5243015a37",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "af66a06b-a514-4210-8e26-2b0fc853420d",
      "target": "738f59ea-7d7b-4257-b71d-04210e837a6a"
    },
    {
      "id": "880561cd-3f5e-42be-9cda-45b8fbb3538c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ef9babda-8826-4982-b057-3730298f9861",
      "target": "4187856f-2a21-4846-a015-9ee493cac511"
    },
    {
      "id": "fe4e6ff4-ceb3-43c3-8f60-dc2fac505527",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6768c0d4-60d7-4618-958d-667540dd8ba6",
      "target": "d171efb6-90a2-4188-8afa-8cd98736269f"
    },
    {
      "id": "2541b94d-1b0c-4391-884a-dddbee7d3f84",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe12bffe-7408-425b-9dc4-c5ff28606f54",
      "target": "9b4b6115-46dc-4aa2-afd8-a478d35637c3"
    },
    {
      "id": "bf5ee5f2-24d9-40b5-a2f8-af2a88ec228b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "59ffe682-19c2-4ed1-afa9-5b8f006310fe",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "1b8491f1-9cd1-4ea4-97fc-221a89f7a926",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7983d8e2-2ec3-4380-94f2-190455d40f02",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "8404b988-e143-4b9d-8e0e-b8fc5d040d76",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5629ee41-b18a-4398-b1eb-5fd86265609c",
      "target": "65b1e8cf-65a2-4d4b-b064-3b945810207c"
    },
    {
      "id": "b586b9c2-d393-4b77-bed1-f8689b6cf61d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a2beb18f-7f64-42a7-9bfd-06e9e60869f6",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "4a9684f1-f900-4cb8-a64e-b9ed696e57fb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e80f4a2e-45bc-45c5-8a7d-24f1f637392a",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "50904d38-ace9-45f9-9f2c-a6ea3837e179",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d295f38d-45f8-4ece-be44-73d7b7706e6e",
      "target": "5e530f23-5852-4aae-b950-0e725c088319"
    },
    {
      "id": "f60482dd-8fd7-4ee6-913e-1b9e004d10a9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "54759c90-be96-401d-871f-9239720a5540",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "bb03ca5e-1c86-4284-a94b-b14184d693e5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3b54eec3-ecd9-4ddd-8ae6-ce99d9cef97e",
      "target": "7a01b840-8316-46a6-957d-08f4bd3815b7"
    },
    {
      "id": "97dbe749-6c77-486b-87db-1cd8293cf1c6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "33456226-bb85-4d15-9302-437f53a271c2",
      "target": "42b0ae2d-6cac-4243-b6e2-37425aa903e9"
    },
    {
      "id": "7f6851ee-1921-445b-8012-cc1b79a376e5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "073eecc9-57e0-4260-a364-bb3a6f1d4269",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "16adec75-c2a7-497b-bd87-b614737e0fb7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "70268c05-d9fe-46a3-96c6-de9feb674e06",
      "target": "c98a7b47-b365-4771-bcd3-356394c28a22"
    },
    {
      "id": "d1c5680a-cac2-4196-bdbe-097bf8bdb1d1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "57b7f25b-a7e3-4e83-8f6d-db0717c81f50",
      "target": "6b05240f-8643-49ec-8de4-8f95950deae1"
    },
    {
      "id": "4ca95db3-f53d-416b-9f95-48f6311b6cef",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c3fa8315-aa75-4bcc-be83-699d89a62a86",
      "target": "7a0b02ab-0b14-4406-b83b-628a0c8825f7"
    },
    {
      "id": "ddde52cb-29cd-4098-a31b-1e11eb28ffc9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f4c5e58-6b09-4798-97f3-c4f495cbf725",
      "target": "fc6e9f53-b7a9-4e53-bdcd-94bc632ab142"
    },
    {
      "id": "a0b6b202-d7b2-4c55-91c2-9cf04fb29ac9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a751304-811a-42b8-bdd4-2b281d13e752",
      "target": "b56af550-6226-455b-9651-70dae0213f23"
    },
    {
      "id": "cef1126c-9599-4c95-8fda-8b03f821e438",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "31cedeb2-2536-4307-9d54-dd0647db2a7a",
      "target": "d1fb7e7d-8bb7-4a3f-baf9-70ab3fb740de"
    },
    {
      "id": "5c3f56e6-8d6c-4fbf-85e3-cfeca06ee431",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "70629b79-6c8c-470d-8d50-40264b855ba7",
      "target": "39e8b33f-8245-4bc0-b8fb-1174e73042eb"
    },
    {
      "id": "63951284-4fe1-47c2-9282-a966b68e788c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd30e3d8-081f-4d41-a170-127df79da289",
      "target": "2fba25a7-5484-432b-8ee4-4336a24c6719"
    },
    {
      "id": "753cac2f-d932-415a-81a3-955f55f5c43d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8ba72e8-0aaf-4d4e-a8e6-60720f3b38b7",
      "target": "0bedc8d0-8434-476c-99ae-50e1e77eb9b3"
    },
    {
      "id": "a5f80009-18df-4a16-a8ac-26a661fe033a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "947354e7-3823-49c5-b5f1-e3609b465487",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "314b4b6d-0146-44ba-b46a-2b2e669a652e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "43a75144-7d51-4ffc-9bbb-e7ad0dec43eb",
      "target": "d5d3449e-6007-4970-9301-95e78c83a60c"
    },
    {
      "id": "c19522f5-97ee-4e5b-89e9-190363f3951f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd0ef2b2-aa25-4b73-b4bf-bd39d85f692c",
      "target": "9b4b6115-46dc-4aa2-afd8-a478d35637c3"
    },
    {
      "id": "9a39f9ba-89e9-4474-9507-75757d218084",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "42df6388-76ff-4d05-8744-a1f75f959a90",
      "target": "f573b41f-ff75-43a0-96d3-2ec5fafd8638"
    },
    {
      "id": "2f4ed774-c3d9-4780-9d16-d5a992a34e94",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c62cf018-06ea-4c21-b30e-3127f9eb54c0",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "c4c47a8d-631e-41b5-a050-4fea0d582916",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "27cf78fb-32c0-49ed-995e-a1e79b0dda91",
      "target": "a341b3cd-84c9-41aa-94d4-ac423cf789e8"
    },
    {
      "id": "dd04e039-80f3-4f41-8208-0e97075b9e3f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cd98eb09-8171-467f-b468-72cd062ecca5",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "3ac223e9-b29d-458a-b455-285b67a0638e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8aa0182-1afe-4bbd-b355-110264135f14",
      "target": "d6ad8cca-c278-4a3a-be20-453394ee9945"
    },
    {
      "id": "6700065f-e50f-4185-aa94-8c4825b672c7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "48b557b5-2939-40d2-872f-e08597c57224",
      "target": "2d382f1f-4ab9-48d0-888d-c0220ca20e3e"
    },
    {
      "id": "b5ac2313-7b63-45ac-b85c-ec8d5bd689bf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ba547d6e-af85-4e75-8443-1c5b877a2d5e",
      "target": "0bedc8d0-8434-476c-99ae-50e1e77eb9b3"
    },
    {
      "id": "b394ddf0-706e-4931-b987-c2abe973d7a8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d5dca4db-48f8-42e6-9cb1-38a90f516f1a",
      "target": "01e49e65-8f8c-40ec-81b5-5a2e596f06f3"
    },
    {
      "id": "ea6d23dc-f7ed-4f8a-b8d9-9ffc409c1f5f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ae4df9d2-9daf-4e79-93a2-2f9a36cf347c",
      "target": "4ef3e1dc-1337-4bdc-b611-284216966c1e"
    },
    {
      "id": "d7dac52e-e969-46da-ab5a-0fa2e61d3974",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c427ae4-b5fb-4b5d-a4fa-832a9865faf6",
      "target": "d95bf98c-1c20-4d3a-b335-7c1e049d3cc8"
    },
    {
      "id": "59b4842a-f530-4763-8d99-3fd4a27195a1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e35f0c96-7e0f-42d0-b5aa-6a2a89adb9ca",
      "target": "6065769c-9eb1-4e9f-a392-a76bfa811563"
    },
    {
      "id": "0308b82e-946d-4465-b253-6d84e18bb79b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9525cfb5-845d-4146-b9f9-aae31ece2dcd",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "bda72e0e-8e9f-4a43-835e-615a2d191c34",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f5891c5-b722-4564-97fe-09b0181efcc4",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "af606e89-fc07-4c30-853b-d1df85b9fdf0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9a8831d2-813b-4703-ab0b-5948f6b4af46",
      "target": "d0bd1867-e7f0-4d97-9f18-63598e8da809"
    },
    {
      "id": "80ff75a1-f3ab-483f-85c7-c22506b84786",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "21d3c45e-1492-4649-8a5c-a4f621f776e9",
      "target": "f48e1220-1352-42c4-bdcb-cc91e02b7640"
    },
    {
      "id": "1f4cf799-fa64-40a6-b646-8e6b5202f218",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0b235399-a2b0-44a9-aeab-2b643c2875f0",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "a7d07bc5-1481-4097-8c06-638b94be2ca2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1b681072-4e3a-44a2-932a-d22fc943f75b",
      "target": "18285b10-f136-4a93-b6c0-88d0ae678f99"
    },
    {
      "id": "759caf44-42f5-404d-8791-3aaeebddb66a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a657a180-8498-4ed0-be77-6dd2d8f455f5",
      "target": "a0d87cef-fc02-4288-a214-276426279ffe"
    },
    {
      "id": "e64a12fd-dd10-42f0-85cb-a136d1012213",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9488e791-1fc4-4f54-824d-61465a0dbbf6",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "8160d6cf-4abb-48d4-9558-31e03c3b63f6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f1ba8142-9743-4118-bfd0-01a778dc3c59",
      "target": "5693c8c9-a39a-439e-ace7-9faa4e4fccba"
    },
    {
      "id": "dc89e37b-4a61-4512-8fd1-19e16fcae2b3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7ff5d607-4d2f-4ff9-bf65-fc8a7a9fb6d1",
      "target": "5b3b382c-4284-47b0-bc4e-a45b2ccb2fb1"
    },
    {
      "id": "1ff7742a-bf1d-4fb3-8c67-969d1ed77b49",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "db07b2b7-c198-4ee6-8de7-aac5ef918907",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "b7e0f977-59b8-4f7d-a5cd-c1defcb32c04",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1bf59584-2fda-4687-9626-144d4c9a37a8",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "26456a44-2d05-4e57-a066-9de21db4cd5b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29944e63-5676-473d-8d43-7bf16ccf6d65",
      "target": "68da9abc-4553-4665-a40c-3b4a4efa0880"
    },
    {
      "id": "b4ff6f6e-4206-4440-93cc-6de9b64ea5e1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0665f990-ccaf-4370-a952-85cc742f0a37",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "0a550577-1bbf-4ec2-9385-1f03983ecca2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1a251845-3762-412c-aa8f-150646cf0522",
      "target": "a0d87cef-fc02-4288-a214-276426279ffe"
    },
    {
      "id": "5f43dc9c-2543-4bd7-bb63-63b527f12356",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3d9a251a-4cb5-438a-9ef9-c429f4eb4597",
      "target": "7c9dc09e-3195-457b-878d-066cde649e0c"
    },
    {
      "id": "be92d7d1-ba4f-47ef-a6ad-d48607f6b7d4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ac74b43e-4221-4756-a790-bd3333d427e2",
      "target": "32f172c5-4869-4949-8d35-40df2fedf969"
    },
    {
      "id": "943d1959-2429-48b2-b958-473f00787cf3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e1b8a148-5b29-455a-8818-bb32214df335",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "102cee7e-1678-4a65-a8e9-f970815f1bb3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d522c613-39bc-48c5-8b27-3353de85dd89",
      "target": "02529fd3-b1a8-432d-b0f1-f5f143b44f2a"
    },
    {
      "id": "39e43e46-5178-483f-9d48-536e70c20af1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "babe938e-30d3-4229-8f79-07e4b9d046d7",
      "target": "2e8c497f-849b-4ea6-9ed5-df335431be4b"
    },
    {
      "id": "352c61e8-b99a-4675-8025-06b337c38e9a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e113348-c539-4dc8-8857-cbcf7afa651f",
      "target": "18185970-49a1-4415-89ef-a5e7148ec804"
    },
    {
      "id": "dea21a2a-737e-4b8f-ada7-9de82622128f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "23669237-8c9a-42dc-a58a-bcf3a6554ce9",
      "target": "68bf56a0-74b8-44ce-8a47-a74b4689deaa"
    },
    {
      "id": "1631bf2f-3fd3-482f-a845-c46e784e1b82",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "64321fb2-03e0-4455-b93b-731447c11b1c",
      "target": "a50d2fbf-a9ad-4ad8-97d1-5fe1a2bf7810"
    },
    {
      "id": "ea1eb153-39ba-47b4-bfe6-b5ce45ece0a4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b26dc4d7-ee4c-4651-b555-25abd4fbce42",
      "target": "6ac40bcd-2d84-47a4-8d67-fd864f458672"
    },
    {
      "id": "79a0f44e-2c1e-4e70-90ec-84249b0e9548",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4a381f04-ff79-4fd4-8bfb-84bb740bc3ad",
      "target": "85ce0dea-31a7-49ed-b674-e15ac6fe3b73"
    },
    {
      "id": "01942a0a-8147-46ef-b98b-a2b2e992239e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4a7e4811-7c28-4a93-a54b-baca1bc83545",
      "target": "a0aeffd1-c6d5-4211-9b3f-c2af1c407d94"
    },
    {
      "id": "b1b4026f-bcc4-4cfb-adcc-2fb3cae98150",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7983d8e2-2ec3-4380-94f2-190455d40f02",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "80ff93e6-7b09-49e5-89d2-57ae1bbf2a4a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ea3b1c9c-3065-47b9-a5a9-d6e6cf8f6c89",
      "target": "0bedc8d0-8434-476c-99ae-50e1e77eb9b3"
    },
    {
      "id": "8cbc3bc1-0842-41aa-96f9-f6094c8f1147",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1889c11e-4f31-4f1e-b2c4-6434f23849b6",
      "target": "d171efb6-90a2-4188-8afa-8cd98736269f"
    },
    {
      "id": "6b6786fb-d339-4206-8fad-9fb0c62c3f37",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "760cdc88-18de-4fe1-afd8-04a9ab0f6388",
      "target": "83f7671c-6ba4-4474-82ab-f809495b15fe"
    },
    {
      "id": "7f4f57b5-7eea-4842-990d-311dd1357952",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cdaa3396-2705-4691-a4f5-d20d8baf81a1",
      "target": "02529fd3-b1a8-432d-b0f1-f5f143b44f2a"
    },
    {
      "id": "cfd66b87-ff8d-4d04-936d-18c2474e9e09",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8fb9abcc-cc6c-475b-8895-8f74b77c9404",
      "target": "b930f90a-c554-41b7-ac7b-933558e21b9c"
    },
    {
      "id": "38b3a571-b1d2-4ca3-bf73-1b275c207fe0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8ef23456-4bae-4ea1-8adf-40d7d3917de7",
      "target": "48cd1ac6-d95a-4a36-bf3d-398f93a07914"
    },
    {
      "id": "65bde639-1ee9-47c5-9962-06e8178bfc7f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "829c3044-d492-4964-ae5f-5f9a868606ed",
      "target": "7e248eda-dc20-47c6-bf62-740d2b90ddea"
    },
    {
      "id": "3aef0bef-71c5-4136-a109-625bd6674f48",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "07804ef2-5d9a-4de2-8f5a-d86eec1fa9c7",
      "target": "acac8623-7773-456f-ad72-68b818265ca0"
    },
    {
      "id": "3e50aa64-5e3c-4c75-81a1-717b7a97ebad",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "89ce3789-0428-44da-9823-47897745615c",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "6f5b3990-5812-4309-b9d1-b6a9942e1927",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a90286d-d304-4030-abc7-779ad5a0a4c2",
      "target": "c0e54da6-002f-4de2-817b-b5cb4738c465"
    },
    {
      "id": "b636cc76-759f-466e-8b6c-1e895d2260b3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "57b7f25b-a7e3-4e83-8f6d-db0717c81f50",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "dc41b7e0-bb2c-4923-8f00-b612b679560f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "629f961f-5de8-4f14-a71d-c03d02d13ac1",
      "target": "85ce0dea-31a7-49ed-b674-e15ac6fe3b73"
    },
    {
      "id": "1c8a12b7-3d3a-4b88-bf9f-58b941e411a0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b81f9ab5-ffe4-400e-9a7b-e5afc612ecc9",
      "target": "6fd466a2-c0d7-4c41-b9c2-d6fb2f465242"
    },
    {
      "id": "325f808f-587f-44d7-8575-125cd3fb2fd7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a6532e8-dfab-461c-8b7c-ac532dae194e",
      "target": "18185970-49a1-4415-89ef-a5e7148ec804"
    },
    {
      "id": "6f693041-bd7f-4b70-a363-86d9b1d3fd08",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e113348-c539-4dc8-8857-cbcf7afa651f",
      "target": "145867ca-a62d-47dc-9132-1424d287866c"
    },
    {
      "id": "736cb811-12d3-4c68-852c-34808f19eaa5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f435bf13-36a0-46bc-9ea9-593ae30741b5",
      "target": "4ce16e74-9f5b-4f44-962c-95892918054f"
    },
    {
      "id": "8550c37d-4241-4eb6-8a47-7a780a9d77b2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d295f38d-45f8-4ece-be44-73d7b7706e6e",
      "target": "a79106ff-3e11-4b71-8fb7-38b68579228c"
    },
    {
      "id": "aa782ee0-eddd-485a-81ad-3df3a840bc5e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7951b86c-7d31-4c7e-a628-92df6a57e05c",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "4a96bf6f-767d-4fbc-81c4-fa3603632248",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c3fa8c85-a135-40cc-ae4a-54e0b14e02f5",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "e78a3869-9412-4c57-9695-e874d106fbc4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "33456226-bb85-4d15-9302-437f53a271c2",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "e35fc632-aa4a-4142-a0d3-02fe09762ef0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b5f49582-98cc-405e-989f-37667a7b9ae0",
      "target": "57bd9069-a0bb-44e1-b6f2-30f7b6c4ee0d"
    },
    {
      "id": "8c482f3f-9f3f-458a-9493-f2f6ef75a97e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f3a9db1-c355-443d-b52f-799742a304ff",
      "target": "6f801393-04ad-406d-8166-68b43c92b514"
    },
    {
      "id": "5449f21c-c2ff-4c7a-af1e-51dc17c23daa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9f97bb7c-2f01-40f0-bcc2-8bb20bd93e21",
      "target": "18185970-49a1-4415-89ef-a5e7148ec804"
    },
    {
      "id": "e7e8fd43-31ed-410b-b086-87ab400696e8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a0e9da64-385d-42f1-820f-c5b485a392d2",
      "target": "9b0de91a-8766-437d-a72f-a06e2d88853c"
    },
    {
      "id": "51523ab4-238c-40b6-a965-192052c54be7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ea763d7e-9d52-41c5-971b-9a5bad17cb77",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "d02de512-4a97-4f00-8e66-f5de8f9b6970",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e738f426-ebb4-4def-a89a-1fe83bdd69b4",
      "target": "b68fa715-f849-45ad-96af-679a5d7dd4b3"
    },
    {
      "id": "42ec64a9-1066-4b73-aa15-fa40d7e36a2a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3650a107-d8f7-47b2-b9bc-b6ecc12f59df",
      "target": "5ae53ad7-90b6-49f1-889e-0329c8f4af53"
    },
    {
      "id": "bc3c30c5-07a5-4ebb-a972-98b0458c3fd7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b0a2bdfd-f536-4003-aeb8-59af746821a7",
      "target": "68bf56a0-74b8-44ce-8a47-a74b4689deaa"
    },
    {
      "id": "f1379016-f315-48ec-a736-1cf69584ba2e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ded40860-e90b-4c78-99fb-394a16fe7663",
      "target": "226df2a8-4481-498d-bac1-4a9b3c29b100"
    },
    {
      "id": "2b5f23b5-b22e-455d-bd12-fde0283672e6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "760cdc88-18de-4fe1-afd8-04a9ab0f6388",
      "target": "6d6f8373-90d3-449f-a054-7013b3e49895"
    },
    {
      "id": "674cb03a-0a20-4f6f-a45c-14e2745f860e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8d989794-ac65-4d8e-bf23-8b573ed562e4",
      "target": "a79106ff-3e11-4b71-8fb7-38b68579228c"
    },
    {
      "id": "64e35d6b-2c5d-4e97-8fcb-789cc110c9c6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8298c861-30f5-40ab-823e-c028301a6402",
      "target": "8e3fbc5f-14dd-4bda-be19-2352e400534b"
    },
    {
      "id": "f2f4507e-3762-47d0-a3f6-ba05f7daa73a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ef9babda-8826-4982-b057-3730298f9861",
      "target": "598d7946-f545-4d7a-a1f6-2839fe251634"
    },
    {
      "id": "ea17c8c3-c19e-4226-841c-9c63c7bf63b6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5e63785e-1ba8-4dd1-8127-5e1c1867269d",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "5ec47911-0aa0-40d5-bf3d-2bc1a7f6afa6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ee3db34d-60b2-462a-9ef9-5d659fa2fe08",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "ca60920b-f6ca-4f89-b16c-be53ea6fc9d6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d6c7cf8f-7a9c-4fc2-9fab-b11b482189de",
      "target": "42b0ae2d-6cac-4243-b6e2-37425aa903e9"
    },
    {
      "id": "8f5271ba-cc1d-413b-a9e8-63e78e73008d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c24a656-9cb5-4d4b-9780-513fa1d2b588",
      "target": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711"
    },
    {
      "id": "0ba7fe94-f4d4-432c-89ad-c56ec75d2af9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5efb9038-676c-49b6-a67e-0f7fde1d7d5b",
      "target": "7b910deb-221c-4577-92ef-145db9eb741a"
    },
    {
      "id": "fef9b87f-14ca-4422-a4b5-7021e5be3904",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "42df6388-76ff-4d05-8744-a1f75f959a90",
      "target": "145867ca-a62d-47dc-9132-1424d287866c"
    },
    {
      "id": "a6c59365-26b2-4818-8569-b28f2b15470a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "34f5c8af-56fa-4dbe-9343-6867aced0287",
      "target": "77194b87-c1c2-42da-b4db-44ad733497f3"
    },
    {
      "id": "1529b9e0-4f47-42cd-9410-3b824a464fe3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c62cf018-06ea-4c21-b30e-3127f9eb54c0",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "2cd1ce61-3d39-4ff9-9e30-2a3317da58e9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a0b086af-0b88-45d8-a5ce-cc8eeefd7423",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "78ced6af-c07e-408d-a319-8f14defd16ad",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d5dca4db-48f8-42e6-9cb1-38a90f516f1a",
      "target": "cdf0bc7f-54ae-44f5-b230-a4dcda8a9442"
    },
    {
      "id": "212bbf90-d552-44e9-9a97-4048f55d8ea8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24524899-707d-477f-8b5c-27887b736fe5",
      "target": "fd9b2f74-1bd4-4949-b512-a84e08f776dc"
    },
    {
      "id": "ea5cf550-9c0c-4f63-b3d9-d6152bab0f31",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "10342fe0-56da-4958-91e1-48feeac43c4f",
      "target": "2ae3b1fb-dfa1-46e3-889d-6535ac644dc4"
    },
    {
      "id": "939624c9-83ff-4388-83e7-4ef727b1c804",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "122a0e2f-cb41-4c30-808e-820e3594e71c",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "3fae4852-a983-4f22-8fb2-7a403ed2f861",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e2eaf31-4b83-45aa-bf91-b14f5bb2bf54",
      "target": "eff071c8-df8b-4d5b-a247-6932fe0ce410"
    },
    {
      "id": "8550b9dd-60da-47e5-8e1f-6bb681b206f3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "efe79d93-c766-4477-8159-1c98bd95c771",
      "target": "780831ae-1133-4680-9175-0dddbec92c3a"
    },
    {
      "id": "ef52a04c-c7ea-4921-a6c3-a05bf12cb3fe",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bda4f2c3-dc0e-4c26-bc1d-d483acc334cf",
      "target": "bf7db85a-a032-476c-a8c7-594db8abce57"
    },
    {
      "id": "686abd51-d4cc-4d32-af0f-fdb5d12a29c0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "28a49b42-e42c-47d3-af49-2636b36fd23d",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "390fe0e3-f3bd-4f96-96ff-dc662f62d78f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c5c0582c-ad7c-4c13-bb69-8b8781c62906",
      "target": "8452224f-70fb-4c62-bdf9-5639ec2dd883"
    },
    {
      "id": "2cc9880d-3a1f-4d62-afbf-c5eeddac3367",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0baaf341-18b3-43ab-9a8e-fc3b47473583",
      "target": "56f75a91-1059-4006-9d3a-dba5489b6cec"
    },
    {
      "id": "0836e43f-61f8-450a-b037-9b2f881d4968",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b813296-10bc-4565-8bfc-0ec976a3e43f",
      "target": "fc67fd7b-1f1e-41ee-b212-1d604438da10"
    },
    {
      "id": "753e66eb-4306-4778-b07a-57e00e764831",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b91a01d-dc70-44dd-8fa7-ad70058a9557",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "2c433ed4-54da-4647-b00f-dbbe802ae045",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fc5c34bf-6560-4dfb-9140-0c7644c3c869",
      "target": "51b6dd96-044e-48ac-9be5-90c41b4d98ae"
    },
    {
      "id": "d2d6d1da-6640-499f-8814-e71ea67a5742",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "28a49b42-e42c-47d3-af49-2636b36fd23d",
      "target": "ea9d185a-0699-49c8-bc37-229793e9eabc"
    },
    {
      "id": "756c5d14-7887-4790-96aa-d518c53013f4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e113348-c539-4dc8-8857-cbcf7afa651f",
      "target": "7fa3d075-df85-4556-a7f0-93926084db2b"
    },
    {
      "id": "7e627b3f-d31f-4112-986e-c8451640a4ab",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd30e3d8-081f-4d41-a170-127df79da289",
      "target": "036b29c9-79aa-4c54-89c0-51ff8370b613"
    },
    {
      "id": "41b75cd1-1b3d-4879-bfc6-37eafffc023c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a4ed064-fcbb-4073-855c-a84480a2204d",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "494c3f06-7f4a-421a-8ba6-dd7d93ff1f4b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "efe79d93-c766-4477-8159-1c98bd95c771",
      "target": "83e30b4e-9ff5-43c0-a1c0-510df00fb626"
    },
    {
      "id": "30423884-faa4-477f-91c3-834f1411e51a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "20119420-2788-47bf-88b4-7daa6dd24c09",
      "target": "3ea8fee5-a31a-4662-9895-315c131b54b4"
    },
    {
      "id": "7bb38a9f-a856-48c7-80ec-dfd89f2c5040",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ddc4ec45-1167-4854-accb-781a268823d9",
      "target": "c2e2971b-ded0-4907-bae2-080098bce87e"
    },
    {
      "id": "675d5b35-aec2-4226-b6e5-803e6ab86c5c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b563ac68-2c98-4ec4-9d2f-b28951353a97",
      "target": "d409d291-5c9b-425a-b908-e1415007eb89"
    },
    {
      "id": "fa3a6335-8740-41c6-aa3d-befb0ee96ddd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bfdf1c35-7ef6-4863-9ce2-7c446c7c50b0",
      "target": "652afc2c-d78f-4e1b-a12d-3f927877637d"
    },
    {
      "id": "0c7b1057-55b8-4333-8be3-dbc989cb589c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e962c729-6818-4db3-8d6d-abb3a57b6948",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "05de9d30-19e0-4cfa-a50b-66d617879e03",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "efe79d93-c766-4477-8159-1c98bd95c771",
      "target": "ce9073ae-da01-4172-8e1d-482f86207ffe"
    },
    {
      "id": "99384b28-f949-4c02-a77c-2b3b3c1f3fda",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fc5c34bf-6560-4dfb-9140-0c7644c3c869",
      "target": "2e8c497f-849b-4ea6-9ed5-df335431be4b"
    },
    {
      "id": "38769659-a3af-4572-85f2-4704ac3be57d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "be716aa4-fad4-498e-9ac8-8a0c03706222",
      "target": "5b79e707-5887-402f-9953-2fc1fa419d29"
    },
    {
      "id": "93d2e851-4495-499e-ada3-1ff42267434c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2aea9b34-1a30-4ef9-a8e0-8c7520b5d57e",
      "target": "85ce0dea-31a7-49ed-b674-e15ac6fe3b73"
    },
    {
      "id": "212bcb04-b9a8-4915-9e4a-bffbe79867c3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0605b001-eab3-4cf0-8cb1-05ff21e56ea2",
      "target": "24224614-c75b-4ff9-8973-9b28f1a12a0d"
    },
    {
      "id": "7d26c285-edd1-42d5-984a-2aab434471ac",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8298c861-30f5-40ab-823e-c028301a6402",
      "target": "99b0147f-08a0-45d4-8b36-874500b7d35c"
    },
    {
      "id": "84e638a1-3606-4e67-bca9-b6a1576ea7c6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0ac3a52a-b636-486d-b873-19585027154d",
      "target": "888fd0d8-9ddb-4db6-8e0c-5acdcfe30738"
    },
    {
      "id": "12b38e35-6878-453a-ab76-d3e4485a2dac",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "245efb30-585d-4897-b792-cbe1549fd9bd",
      "target": "fc67fd7b-1f1e-41ee-b212-1d604438da10"
    },
    {
      "id": "72cfad69-a7d5-48b7-b8e0-1c6cad86cace",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "56c86f6d-3137-4960-b19d-1cd8e12e8030",
      "target": "7b70b439-3c9e-44df-bfe4-0399c2cb07d6"
    },
    {
      "id": "4b04da54-6a70-47bf-9d33-1f6fb0593926",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "289f573d-b649-4859-8179-f1589a3852a0",
      "target": "f937952d-470e-42ee-8ea9-43352efd8f3c"
    },
    {
      "id": "21f67040-1921-439c-a89d-b0dd8add4cea",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1ca74dfe-e0f3-48db-984e-172de8e3b9ac",
      "target": "6ba54370-81c5-41ee-9f84-1d560ba22815"
    },
    {
      "id": "1e1f7abe-992c-4edb-9ee1-eeed3a2b2d44",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f76bfef-886b-46ce-ae0d-e23c2de5f0c8",
      "target": "49726e02-b29f-4333-aa05-1dafeb3802dd"
    },
    {
      "id": "176c4712-b21f-473a-8dc8-743d1e4bdead",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "14c15e25-cfc2-4ebd-a8ba-cb5956a0d721",
      "target": "d6ef77b3-de75-4a74-919d-690a412ab9e2"
    },
    {
      "id": "d83fa375-c531-4cca-ab0f-46ad2302be3c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "635d0a41-d36b-4a03-a9fa-e96da257aec4",
      "target": "413c4049-f6fe-41e3-94a8-b4be02ad64f2"
    },
    {
      "id": "767157ec-1cdb-4ddc-bd0d-860bf8e52c07",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3012f674-523c-4c81-abe3-d1be9e2de3a4",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "3d62d1bb-8903-4070-af67-0651748f30db",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "007e99d4-c9a1-491e-8dc1-804844476520",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "342d3199-b3ab-4d16-b286-3716f0c9a73f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bfdf1c35-7ef6-4863-9ce2-7c446c7c50b0",
      "target": "d3ef9cc6-e8d0-4d38-a7d7-91f00011920d"
    },
    {
      "id": "3308c3b9-174a-465b-8ed4-54e9627fcb57",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "34f5c8af-56fa-4dbe-9343-6867aced0287",
      "target": "5ea60212-1eb7-4e09-a4ef-3c14d3cafd18"
    },
    {
      "id": "8a07e10a-6738-45e8-8848-004f2391d7b3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e27e4081-256e-439a-b4d4-2b59485f31e1",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "9d58527e-c245-4c49-9239-e258662fcca6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "07abf887-c3cd-43f9-84f7-4899f863abef",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "b4652b8c-8a44-45d0-b28b-39ca69a57aad",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6d6cf97f-17b2-4f74-a184-59e4c5efe56f",
      "target": "13c7faed-b053-4151-9de9-82d8934a9b0c"
    },
    {
      "id": "902f9a68-0bba-459b-951a-67cdb9515f28",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2ca9f5f4-9b36-4297-99ad-30fb56df51e1",
      "target": "2b253c21-2fdf-4b7d-aff7-a787e9a80485"
    },
    {
      "id": "e50f94fb-80fe-4010-a018-051350027ddf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ffc24834-8795-413c-8279-f9ad7ac19902",
      "target": "c98a7b47-b365-4771-bcd3-356394c28a22"
    },
    {
      "id": "a2684989-c458-420d-8ab3-0878ccd961a2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c86f4057-87f0-4ceb-9789-6cbe191f6a1c",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "e8c0151c-c537-4790-9d93-5720a3e94b42",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0d92deb9-9942-46fd-9204-a3658ef998f1",
      "target": "95a6f791-b6d9-4002-8173-cf009650dad7"
    },
    {
      "id": "00674a50-82da-428e-b52f-46102f6b13c9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "20119420-2788-47bf-88b4-7daa6dd24c09",
      "target": "528d8fac-4622-40e7-bdcf-fd97c7d5a865"
    },
    {
      "id": "f4e6a988-9bc5-42e5-942b-92a968129f60",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "13fd2af5-8aac-4a11-8bc9-d3f162fd915d",
      "target": "ba0c531f-b802-44fc-a3eb-557d588f5b75"
    },
    {
      "id": "0d8f6f39-f620-4b80-9c37-e0116d62400a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3afa66b2-48e5-4c62-8f54-455d27c92e95",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "5a46b474-8302-4f02-a1ae-357a9ce85f96",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "780b4b7f-40fa-4924-a55c-0fd4998d32f9",
      "target": "c1e35d9c-f53a-4cb9-a13d-bf1015280d3d"
    },
    {
      "id": "007002ef-d156-4edd-a2cf-6977e51bde03",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cb10f260-d6b0-4083-8d0c-16c640856a59",
      "target": "8280c6dd-49e6-4e59-8b46-a4e771f6f6ec"
    },
    {
      "id": "f464d2ea-5ec1-495b-946b-b355a0620bae",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c3fa8315-aa75-4bcc-be83-699d89a62a86",
      "target": "37963107-067e-46c8-b519-e7758ab8c90e"
    },
    {
      "id": "a531cb39-9420-4646-9209-97fa16a1ffde",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d4fa8435-1712-49c0-9552-e79a5c59bc5d",
      "target": "08f4f061-0650-4739-8a74-cec7ce312bfd"
    },
    {
      "id": "69ffd934-361f-4e5f-92ae-34fec4c30081",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "78d5ed55-1b3b-4728-a26e-2b35710ecf02",
      "target": "b51ead58-2a71-49b3-bff8-474d8a433811"
    },
    {
      "id": "7483d49b-e910-433d-893a-08bac67dbd6b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3befff07-86fe-4546-959b-01819a409bbd",
      "target": "a93eca05-8114-47b6-8be4-573bae39c0fc"
    },
    {
      "id": "44d33fa4-6652-4433-91b6-c0a3dfef5bc4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b5f49582-98cc-405e-989f-37667a7b9ae0",
      "target": "df2afc86-fb58-4150-ae7b-25fe0f635a23"
    },
    {
      "id": "b32dcba0-b522-4864-a2eb-3c18f1de6a90",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7cd320c0-ec71-422f-806e-ed8d85426265",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "b82291dd-294a-4834-bad5-f8763da672d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd20c501-68c6-4286-b957-d6b50b13b564",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "f8a889ea-2097-4868-acaf-73d87e9d2623",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "42df6388-76ff-4d05-8744-a1f75f959a90",
      "target": "997f4b56-7b13-4ec9-8d72-1958ae026803"
    },
    {
      "id": "55a03bd9-4a51-4643-aac3-5e6241963435",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "257b19d9-168a-4e95-acf8-693dfe6980cb",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "404efbb2-0c0b-4e83-b0be-83f98e5286fa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fda96335-e82e-4ee6-a6e6-91b140cd05e6",
      "target": "e739db6c-a980-42a9-b1ec-2fcb8212b5c8"
    },
    {
      "id": "d4e96fbe-8a66-44cf-bf7b-0070a5b684f0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f2ddabce-6e2a-4a73-8922-be4d8e93c3a9",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "6bdf9195-c924-471c-9dba-fc369d4d5afa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "760cdc88-18de-4fe1-afd8-04a9ab0f6388",
      "target": "51a63389-6409-461a-a76e-51cce1061364"
    },
    {
      "id": "15a53f56-2e7a-485a-94a6-27de5d97ab0a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "33da5625-37e9-4969-9a53-0507ca2d21ba",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "ffa1b61b-204d-4469-87b5-ffe602feabbc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b4fdd1bf-165a-4bec-aa51-e7f010acb11c",
      "target": "52f303f7-7945-46b5-863d-ebd55e44369c"
    },
    {
      "id": "656ad471-ee93-4908-9a9c-80bdcc2d6e70",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4c0e76a1-5894-4ec6-b1bd-ee4528d288b6",
      "target": "49961b16-94c9-441e-9b98-5e30a3c1838f"
    },
    {
      "id": "d439a105-350c-4df5-9854-5780fe4d5ed6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e4f8bf1f-9c47-480c-b518-2cfbebc9abf5",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "a9b0ab49-d5f8-491c-b3c9-677a7503b955",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "08e649c1-ddca-4c46-9543-6e46616bafbb",
      "target": "4b65f341-97c3-4777-aa70-05c5a42fcd5a"
    },
    {
      "id": "1e62fcec-78e0-4a4a-8e7f-791ca6ce3029",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5d3a28eb-92d4-4aca-9d73-a03cbf511f11",
      "target": "54634c49-3f72-4b90-b2a7-97b52b036253"
    },
    {
      "id": "9f7844f3-c527-4f43-8de2-85ad9b124117",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24524899-707d-477f-8b5c-27887b736fe5",
      "target": "2181a4c0-dcab-4829-96ee-7a056324de41"
    },
    {
      "id": "d5f138bb-e8cb-439d-810e-d66ac05a779b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ae25cb27-0e52-4daf-9519-3fe5729e79fd",
      "target": "ee00bffd-ca26-440b-a14c-0e094f08b455"
    },
    {
      "id": "a4b309d9-cd85-467b-8121-ecc02c544e1b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29fbfef5-4427-454d-a253-9453fc041f17",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "2a417454-362e-4932-9283-6d7d1c199eae",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9227406e-58ba-4133-a0ed-adccf128a9f0",
      "target": "d7f67d16-1f2f-404b-96fd-2a4bb1f647dc"
    },
    {
      "id": "0ff0ff58-a680-4ff8-acac-b20f229305e3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "49b01e47-e09b-4199-8ef9-780c0cf9b9f2",
      "target": "8ff7ea61-c345-4aee-864f-f9ce07589289"
    },
    {
      "id": "d50cc93d-be2a-46b2-8190-886e6c6eff46",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8bd8ba1-2105-4505-806e-48fb571f5c3e",
      "target": "6f5c6b59-0021-4e20-aee8-83473b355f9f"
    },
    {
      "id": "38eb9941-6c29-4ccc-af5a-a0772dba8c13",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cd98eb09-8171-467f-b468-72cd062ecca5",
      "target": "1fb006fe-09b4-4661-9dba-b6830f1e53cd"
    },
    {
      "id": "a170d8cc-6b65-405c-95e1-4eb4fa3cf3c2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "725dbd08-45c9-4cd8-bc80-e1a9d736f4f3",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "b6da013d-1cdc-47b7-aaad-d37974aac269",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "21283757-946f-4825-9677-bfb93188f0ec",
      "target": "9b058ed5-9b62-41ea-9dbc-52aa89cb8e2e"
    },
    {
      "id": "4ba11a51-fecc-4e41-8157-5d99b7743636",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f677575d-9276-4dc0-bb0c-f716fe1dcea3",
      "target": "3930034d-a6d8-4173-9177-b4b4320b0620"
    },
    {
      "id": "d18118c1-7cff-44ad-90f5-e22b6cfd368c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bd82f509-9eb3-483f-a861-7b962a10b332",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "0bb026b5-d57f-421a-a138-3ccc602ebd81",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a777b32-52ab-4638-ba5a-be3c9a881949",
      "target": "4dd16328-137b-48d1-b8b6-7377562cd8df"
    },
    {
      "id": "c54d7a3f-41f0-4095-a3be-030897097fb2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1e442c0f-d45f-491d-abaa-74c6c70203e1",
      "target": "d405213f-34e6-47db-b2a4-d1b2fdb8f494"
    },
    {
      "id": "3046622f-91ba-4b9e-be5c-d552d184c828",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4a7e4811-7c28-4a93-a54b-baca1bc83545",
      "target": "f48e1220-1352-42c4-bdcb-cc91e02b7640"
    },
    {
      "id": "324253ff-274c-4f5c-95e1-fb68856829a5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29f775e5-a87f-4f66-8175-d1b57c0b16ae",
      "target": "106e349b-7453-4eef-bfdf-50970a77876b"
    },
    {
      "id": "f443dd8f-5311-4cc9-aff1-a1c5bf1ccb7b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "314aaa1d-c920-4e90-a42b-991bf6bcee91",
      "target": "a9f91b09-1a41-4326-aa65-34ec8f13702e"
    },
    {
      "id": "bd661b2d-37fe-490d-b778-1650b3232a87",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29fbfef5-4427-454d-a253-9453fc041f17",
      "target": "8fb9d263-8bbb-4427-b9fc-399e88c5d504"
    },
    {
      "id": "029e3fed-9957-412b-afd6-c9ddca802acc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "558b7f08-252c-414c-84fc-28519db57d04",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "6d7f2776-e363-4688-95a1-fb9f5af22cd8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6dfd0047-961f-4611-9a5b-50c063d610f8",
      "target": "49336bf1-3f56-4de5-a119-ba821d418b57"
    },
    {
      "id": "25abc6fd-3390-4d18-9c95-3a7136821aa3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c62a72e-1761-4e2d-9ae0-cf5bbb816dd6",
      "target": "643be748-f49b-47f6-8ea1-bfecb4fed4d9"
    },
    {
      "id": "c6e3a505-4f06-4cad-88de-dfb73f59bcf4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd20c501-68c6-4286-b957-d6b50b13b564",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "b371c13a-a3ae-46ae-a0ea-ae123227ba72",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "54759c90-be96-401d-871f-9239720a5540",
      "target": "291307f9-b16f-4ecb-b823-c5362939132f"
    },
    {
      "id": "5fed5fc8-3e2a-4dda-b7ac-1bafb4b5c71c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bb1fbef1-6272-47f9-9086-920e36b2adbd",
      "target": "8245e903-41fd-4a7a-af27-6d61bef4b6ea"
    },
    {
      "id": "2084b7f3-9de3-4716-be96-30a5f5af0734",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e2e9b126-b4b7-42d4-9788-196b23bb9ceb",
      "target": "782ddb40-b795-4748-a984-5f2dab7e096c"
    },
    {
      "id": "46563a4a-7bb1-4ae3-bf52-414baa4bfbed",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "af66a06b-a514-4210-8e26-2b0fc853420d",
      "target": "99c05d67-336d-4a26-bd7d-41a2d2354474"
    },
    {
      "id": "164a3525-a430-4a4a-9cb0-95c4a07356b6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bd82f509-9eb3-483f-a861-7b962a10b332",
      "target": "42b0ae2d-6cac-4243-b6e2-37425aa903e9"
    },
    {
      "id": "c472e724-b600-4eb2-9b94-07e448031f81",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2ca9f5f4-9b36-4297-99ad-30fb56df51e1",
      "target": "7b986f6d-0c87-4208-9e22-dc840e493f63"
    },
    {
      "id": "794051d0-ee98-4c87-b94d-bfbe09caf90d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a4d8c09e-677a-44e8-a37b-dcbef16bdd5c",
      "target": "bf3343f9-8e2d-4d7d-9b5d-5b5557da96c2"
    },
    {
      "id": "8afe3ab3-e137-454f-b715-a0dd7cf854ea",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe69a11a-019b-4542-9cd3-ab7c8ea41b1c",
      "target": "eb69936b-6160-4729-bfd7-17b1b404ab5b"
    },
    {
      "id": "9716aeab-e558-4705-a89b-032058a8f50a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fda96335-e82e-4ee6-a6e6-91b140cd05e6",
      "target": "45b9f239-2e9b-4b50-ba6c-95712a540eeb"
    },
    {
      "id": "e3183fac-eddd-440f-9339-82b73560fcaa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "59ffe682-19c2-4ed1-afa9-5b8f006310fe",
      "target": "8774b975-8813-4fe5-9f14-1131e04c9e58"
    },
    {
      "id": "a9979792-d50d-45e3-8352-ccea07443d58",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "039dc981-aad5-45bf-9d62-9f3bd307a687",
      "target": "ad725064-7fce-4167-acca-ad994be409cd"
    },
    {
      "id": "f84ff09f-fd62-402c-858a-4a44101216e6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e13fb8f-e809-43e9-9917-acb0c224bfb6",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "a3d55a20-d425-4b26-be73-e0219062cca5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4ad846c6-2692-4b3b-85c4-cdc0cc9bedf3",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "7215dadd-6793-4149-833d-cf803ff65837",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b10eba88-df54-4ee2-9c34-6ae63ebdc709",
      "target": "3096e853-f9a6-4910-aa52-d2dd504d763b"
    },
    {
      "id": "6e544d1f-ed44-4ea9-94ae-82a2f6fd9552",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c9835829-e478-432e-b644-e7c26b794b0d",
      "target": "cdf0bc7f-54ae-44f5-b230-a4dcda8a9442"
    },
    {
      "id": "f557ae6d-ef0b-41bf-b659-ee1438be2468",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "100df992-d65d-4997-b64c-950d4c2a489b",
      "target": "876c3586-b34f-4f7c-bd4b-f49c425b7be3"
    },
    {
      "id": "69cd088e-9a95-4214-8161-276051bac5b8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6dfd0047-961f-4611-9a5b-50c063d610f8",
      "target": "81db4ffc-e5ae-4dc5-bd40-b3421977d8a8"
    },
    {
      "id": "a7cc42f5-2ee9-4199-ada8-8976440823ae",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "10342fe0-56da-4958-91e1-48feeac43c4f",
      "target": "145867ca-a62d-47dc-9132-1424d287866c"
    },
    {
      "id": "e535c154-d5d9-4a37-b36f-05e57c47a53a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c78a486c-88f8-4d48-90b5-18e98988909b",
      "target": "345427ed-6be5-4bec-8064-7f648f8786f1"
    },
    {
      "id": "d2253c9d-86c5-4760-a3ee-4207018c3890",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b95813d-47a0-4964-adcf-093772e3097c",
      "target": "13c7faed-b053-4151-9de9-82d8934a9b0c"
    },
    {
      "id": "ce1257c3-88f3-42e9-9e08-b2d8430f0c96",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "93adb624-7b40-4c31-b59b-16e682fd3158",
      "target": "51b5a0b8-ac13-4a13-a0e1-def6d1c32fa4"
    },
    {
      "id": "9b51f43d-4984-46a2-8f6b-61aafe376b34",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "257b19d9-168a-4e95-acf8-693dfe6980cb",
      "target": "b51ead58-2a71-49b3-bff8-474d8a433811"
    },
    {
      "id": "46243ef8-62ff-4aec-b91a-da042fabd79d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ff2cbd5a-fd38-4d13-b91f-2471dcd72262",
      "target": "feabb0a6-8fcf-41fc-884d-e967ecb15185"
    },
    {
      "id": "36fc856b-505a-43ee-a009-811bad40f8ad",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e27e4081-256e-439a-b4d4-2b59485f31e1",
      "target": "35c5421c-e372-40ef-a8dd-6ce5dac897b8"
    },
    {
      "id": "86712aef-c801-4bbe-ab2d-56de9da0b31a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5c1416bc-96e2-430c-9630-0808a1d8cdc3",
      "target": "6d316b70-d670-4d4d-8f12-2a4730a9c47e"
    },
    {
      "id": "ce36ad8b-32e2-4ee2-bf2e-80620f086617",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3a0c9340-3aab-448e-80ad-d05f73277fa6",
      "target": "75df8751-561f-421d-b5f3-0cf8c5977fcb"
    },
    {
      "id": "f3204207-ef79-4d46-aa9f-2bed20f13c5d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d13f55e3-d1bd-4a34-beaa-d3be48bea4ec",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "3666a7f8-56ca-4bc8-9d83-267d4a9e1ec1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ad754385-5639-4fd3-a940-1748bfda4be5",
      "target": "aff1079c-9101-4d45-8ed2-10ebea13c140"
    },
    {
      "id": "c5c3b3b2-2caf-4840-858a-d70045a5ba3b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "70268c05-d9fe-46a3-96c6-de9feb674e06",
      "target": "1be83cb9-756e-4ea3-8c46-6c6d18d3a9cd"
    },
    {
      "id": "374a6f61-8428-4fac-af96-f375017e828b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29253ead-e415-423f-992b-c76cecd8cfec",
      "target": "86008cb5-33cc-497c-82f6-4c8067c0dacd"
    },
    {
      "id": "f39bbe24-9d74-40ac-975c-d52f04440366",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4c0e76a1-5894-4ec6-b1bd-ee4528d288b6",
      "target": "07cbec61-039f-46a3-b08a-4ffd43e32d3e"
    },
    {
      "id": "4471bb47-5739-429d-b24e-55d235b3e511",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "87878d02-ce73-4ffb-b70e-ca63580c7f5e",
      "target": "1418b034-3352-4333-b749-cb62ccb6960a"
    },
    {
      "id": "3122bbf3-e9e4-4135-b464-aaefef9ffb9a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "876ea202-405d-46b5-8339-21f169dc0192",
      "target": "92e3a8fd-fb1a-4a28-b353-3ad235a33289"
    },
    {
      "id": "768a7c1f-ebad-49ba-be21-8c9501c8a1b5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4ce47ed5-c01b-4930-a91b-ed2688adce7b",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "1edce165-0990-43c7-a9eb-383309709dfb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3bc21ecd-15f5-4301-940e-69367b95f91a",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "5699e6bc-9120-411b-aa25-0bfdc365a8c0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8bd8ba1-2105-4505-806e-48fb571f5c3e",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "2aeb3bd8-63dd-4825-871d-fa4b66bd54f3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "883b19e1-8e82-45de-8247-82be991be67e",
      "target": "94e09efe-cc72-4d27-94bd-8cf5f9136dfb"
    },
    {
      "id": "10cb94b8-2acd-46af-bc0e-81b4e1f91b6a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1ca74dfe-e0f3-48db-984e-172de8e3b9ac",
      "target": "8dc446c8-7907-4d91-bbce-dfb7b35c0855"
    },
    {
      "id": "36694d67-a026-4962-b96d-85b252cf4bba",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "684474de-f7f4-4ed3-9d32-dc046745be98",
      "target": "f81159b8-8cff-47c1-9806-95651c2ff414"
    },
    {
      "id": "9147ae00-0634-4934-a899-105926b0b3fa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c86f4057-87f0-4ceb-9789-6cbe191f6a1c",
      "target": "15c038c2-9e5d-4ac3-9d5f-f7da404a5530"
    },
    {
      "id": "02edde8b-b782-4378-86d1-5a483170c161",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "684474de-f7f4-4ed3-9d32-dc046745be98",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "ed557314-0664-4032-9879-a6cc02db2954",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3d9a251a-4cb5-438a-9ef9-c429f4eb4597",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "4cfbd3c2-d96e-4d07-93dd-3136fc737640",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "be716aa4-fad4-498e-9ac8-8a0c03706222",
      "target": "e2bb88e3-9128-43e0-a051-15b3c71fa03e"
    },
    {
      "id": "5b5a07be-4587-47b3-b530-c86925c641be",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "296bfb58-780c-477f-9660-1d181192ab64",
      "target": "e132def9-508e-4ea4-bd23-316cb7fc0e06"
    },
    {
      "id": "44109b93-7054-4645-8dc4-83f57fae6093",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "073af219-00cf-4101-b198-63571c1e4bdc",
      "target": "0b80d411-b7a1-4a97-aaa8-6361ad25dc3c"
    },
    {
      "id": "18d275b4-5e43-49fb-98eb-683d3f1d1375",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "05c65a11-0ac2-4f11-b8a6-721382c2fea6",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "9d64799a-137f-4e01-b93b-75554166a808",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "11ac3574-e189-453a-bb66-e6eae0c6e2d5",
      "target": "91de2522-6744-4fb9-8e03-72fa9de2776a"
    },
    {
      "id": "3373255f-b4f3-4fc9-a39c-acdc085ffbde",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6dfd0047-961f-4611-9a5b-50c063d610f8",
      "target": "afc83851-b62c-4b42-aafe-b195e2a22c3d"
    },
    {
      "id": "4f8491f6-224e-468e-927e-f9e3de0bd794",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "af66a06b-a514-4210-8e26-2b0fc853420d",
      "target": "f184c5d6-5c64-4b7b-a660-0f709332f24a"
    },
    {
      "id": "50d300fb-56e5-4c75-8c0c-6dc28e97a815",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "05f62a6a-0283-4e9b-87ce-2b5700ac248e",
      "target": "35116c97-0048-4764-b7cf-da36fbedc217"
    },
    {
      "id": "649a1212-bcdb-4560-aa9e-c14bd6f2a4f3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9f97bb7c-2f01-40f0-bcc2-8bb20bd93e21",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "2fef53f9-eba3-4b0d-b938-81967a5297cd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "275e66ee-02e4-4085-a5ff-7b0b7dac5cdc",
      "target": "287fc441-51fb-4294-88a4-3b26597d2cb0"
    },
    {
      "id": "6b5bf4fc-adc9-4073-bed0-2456be8f04bd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0eebf2c9-72d3-417c-ba40-204090fc975d",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "8cc8b935-d412-43bd-bdd6-2bd08193d727",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7e639f23-ee68-4e89-a7b7-fd0db884f513",
      "target": "396a55ff-5a3d-44c8-8624-7b5c420ee4b7"
    },
    {
      "id": "6738afd0-1c2b-42cd-bef0-6447679e49ef",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "289f573d-b649-4859-8179-f1589a3852a0",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "fd921d74-2a41-4885-8acf-7e0853bced04",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a7dc7e54-627e-4282-bf8f-3f3bd6d68949",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "824171fe-5b96-4705-a5e0-28d83f9a9056",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d34f163b-3fdf-4c47-9a94-321d2ec4509b",
      "target": "0ec80ded-d3db-4f39-9352-df6fb39ce4cb"
    },
    {
      "id": "29177b06-13b3-4b5d-8ce9-5ed58dc67fdd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ff2cbd5a-fd38-4d13-b91f-2471dcd72262",
      "target": "9b4b6115-46dc-4aa2-afd8-a478d35637c3"
    },
    {
      "id": "07f8b969-6a19-4c71-97dd-002d36f28341",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5629ee41-b18a-4398-b1eb-5fd86265609c",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "714c8f0e-8049-469b-bfbd-2834affde3e7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e692c214-6f18-4efc-b928-a26642799957",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "fa335eaa-891b-4079-beaa-cf5729948a49",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7d9d50fa-740e-41bf-ab37-b961edde7ac4",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "55986788-5337-4930-bdb9-bd792021f5e6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0df3ec7c-59f2-4efc-8e85-8005382cb248",
      "target": "0ccbe101-da60-439c-b087-05eab717ec36"
    },
    {
      "id": "c7a922b8-526c-4a5b-ad56-db408a653aaa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a6159f8-3ea1-41ca-bdda-2e909368fc5d",
      "target": "756bd408-94ae-4e49-be18-cd1438d3cd96"
    },
    {
      "id": "b6025f38-4f06-443d-9734-89995adfc0fb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c156bb21-e68b-4cb2-9427-2151b90f3788",
      "target": "7617a2ac-c26c-45d3-97ee-516ef2796b00"
    },
    {
      "id": "20dec7f3-b4a2-4670-9711-56bd9781c8de",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0989c9c6-9a04-4df4-b20c-a65af39af17e",
      "target": "acac8623-7773-456f-ad72-68b818265ca0"
    },
    {
      "id": "1aeccffd-a436-4c04-8f85-9af31ab04b42",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c62a72e-1761-4e2d-9ae0-cf5bbb816dd6",
      "target": "12417911-45d7-481f-9704-529f4d299714"
    },
    {
      "id": "3dcbd86c-2777-44f0-b1e0-cefb70d62ccc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7809f78c-59e8-4d30-9496-f7d16b416a3b",
      "target": "732755f2-02e0-473f-af60-440f5d07a8b2"
    },
    {
      "id": "d449ddbf-56bc-473b-aea8-59cc61b89269",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9f0c50c6-1314-4186-8018-b667b804dc9d",
      "target": "f5aa1594-845c-4be0-b91a-a5b3a5d9478f"
    },
    {
      "id": "b7386bf0-8302-4a77-8ece-34cc48965229",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0df3ec7c-59f2-4efc-8e85-8005382cb248",
      "target": "72d8dc53-f180-469f-81e5-805c65f347ea"
    },
    {
      "id": "2ab6fc1e-4648-4b9b-8dfd-6336287a6eba",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e86ba7f-ea5a-4a1e-bcc3-c2587e04889f",
      "target": "81feb991-b743-4d72-83f4-dd5b311b21c5"
    },
    {
      "id": "ff61b702-2783-4dc1-aaee-82e74aacc7b2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ee6220a6-c0d0-49de-a88c-af4bf8d5d8d0",
      "target": "84ecfde3-5f13-4069-8b89-29c6f293ae1b"
    },
    {
      "id": "e4a95911-9ce9-4265-a293-82405055b042",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0c3f88ab-94df-45da-b61d-821639fa58b6",
      "target": "736c2c7a-3e0b-4f23-8bc7-479e9f1b0208"
    },
    {
      "id": "34de7744-91db-49ee-9c2a-5a3db9743e9c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d4fa8435-1712-49c0-9552-e79a5c59bc5d",
      "target": "73e2ae84-878f-4207-b4bc-4e1bc663cbf1"
    },
    {
      "id": "919408be-55cd-48ca-a464-19dea8679741",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9328691d-5b23-4133-b6f6-d7bd136b121c",
      "target": "4479fa89-5234-4046-9332-e44d4f567a9d"
    },
    {
      "id": "f4eb7c30-8b0f-4cd6-b91b-a6da41d028d0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "039dc981-aad5-45bf-9d62-9f3bd307a687",
      "target": "abd02613-b8c0-4e58-a4ff-014b7b7b4920"
    },
    {
      "id": "646d67ba-dda6-4068-99d9-d4f7052be903",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0cecd1f1-0006-4815-8f72-f93c2cba356e",
      "target": "876c3586-b34f-4f7c-bd4b-f49c425b7be3"
    },
    {
      "id": "ed2baeef-8a1c-4c15-b462-72b9b9b7ea23",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f4ddf63d-d4b9-4fac-ac6b-686f9ecbfb8f",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "346ba1d7-46f6-49fa-b96d-d58565d15515",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ea763d7e-9d52-41c5-971b-9a5bad17cb77",
      "target": "f75db036-987d-43cb-8968-ef68f906416f"
    },
    {
      "id": "f978a62e-9e3b-42c3-a6a2-dc179aab1068",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "31cedeb2-2536-4307-9d54-dd0647db2a7a",
      "target": "39b8e463-c918-46ef-b3c1-d1760fc633e5"
    },
    {
      "id": "b7cd2c7b-a4e5-4ab2-8d15-378e9061273c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a657a180-8498-4ed0-be77-6dd2d8f455f5",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "5d7d5068-6d0c-4d22-908d-41e4c700f2c2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "073af219-00cf-4101-b198-63571c1e4bdc",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "94f3b4e8-01db-4873-b2e4-e02f9abca8a6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6467f1c5-df8b-4dba-bd02-a7b41f7c6f87",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "71381798-33f9-44b1-8962-6510afa1e7cc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4c0e76a1-5894-4ec6-b1bd-ee4528d288b6",
      "target": "4165d12a-4504-463b-8ec5-d9c54fd3c67d"
    },
    {
      "id": "7260ca64-b674-4ccc-990d-ef968f2acd50",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "245efb30-585d-4897-b792-cbe1549fd9bd",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "b4f01f54-c930-493e-b7c1-1636480eb72c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "96c707a1-8786-4251-8f2f-bd9521479388",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "a33f6c45-d3bc-4fe0-be57-22b51138d19f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "456c7aac-a41a-4616-91b7-3aff7e51c3b6",
      "target": "8ff7ea61-c345-4aee-864f-f9ce07589289"
    },
    {
      "id": "a8fa8f89-4041-4910-8cb8-63f04a89c5e7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9dd69c21-a944-42a1-b1e0-be534030a55a",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "47cbdef3-0807-448b-9b9e-5b89f904d8be",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "265c372a-2c88-490b-9440-5929df209beb",
      "target": "5db8ac29-7417-4c88-8b5f-655b39cfc8eb"
    },
    {
      "id": "64b33dca-27f4-44d6-ac86-1bf4d2719bc0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "00720838-b025-4303-93e6-04fc5cf9a930",
      "target": "ca6f8c66-d920-4163-b877-640f7213469e"
    },
    {
      "id": "f3a75e03-8301-47ba-ad24-5fc02d6cd87a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "700163f4-7cfb-4bf4-a674-12f992fda1a1",
      "target": "6f801393-04ad-406d-8166-68b43c92b514"
    },
    {
      "id": "408f1ae7-2376-4108-b8c4-1ae120dad87a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d6c7cf8f-7a9c-4fc2-9fab-b11b482189de",
      "target": "fc67fd7b-1f1e-41ee-b212-1d604438da10"
    },
    {
      "id": "4baefce5-6408-45f6-91d0-b387bc4a428b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5ac07153-1805-4142-a9ff-753af0d12264",
      "target": "dc54d21a-71ac-43f9-a725-ca0dbaa7ae38"
    },
    {
      "id": "2057341c-15b8-4701-bf6b-0ad7080bbd6e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0b235399-a2b0-44a9-aeab-2b643c2875f0",
      "target": "d2c64f56-5983-4936-a398-e10e966bff0b"
    },
    {
      "id": "99478511-fcb8-4dd5-a8c2-eda7b0599c7f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f538153-0ee0-4510-aaf5-3e7033b34517",
      "target": "cfbdb5ea-749d-460d-9a98-cab0381296b3"
    },
    {
      "id": "9dc12d31-da7a-47d0-8be3-d7fade117efb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "32fa9e87-4068-4041-845a-38463f418497",
      "target": "f8dca991-48d3-4dae-a84e-1f4e6b7c4206"
    },
    {
      "id": "af036e53-9c79-4470-bb3a-6d15a3c01579",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a5aa1bce-38e4-473c-af03-739429061381",
      "target": "e49f8c0f-8bf1-44ff-bbe7-e8c43e3f2d9a"
    },
    {
      "id": "08c620ed-80d4-4394-a897-51bcdefb9f5f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6602c36e-f371-4b04-b662-000a779f0e65",
      "target": "08e9259a-7d11-43f3-b344-0947dd58ca7b"
    },
    {
      "id": "304800c4-4890-4d6b-a6ba-52b3d3abe7ea",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0b118eac-2158-4006-9017-1713c74894c9",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "a1713c40-a9bb-47ff-819f-22d1831a5780",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fda96335-e82e-4ee6-a6e6-91b140cd05e6",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "c9cb7205-9fd8-4441-b746-f1735752f06c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e46b15af-34fb-4fa1-89fc-94a2d545e2e8",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "327c4d8c-20ef-4232-a413-9348e234a501",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "992a6b2e-897b-4e21-a729-e10547f22e3d",
      "target": "bebb1095-4c34-4051-9627-7cb880fbedb3"
    },
    {
      "id": "8658d753-e6a2-43ac-b20c-06c6a81ebc56",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "28817efc-f79b-407c-a95f-6f158f40a896",
      "target": "8d43f87d-2ccd-4ac3-aaf9-fba24aafee10"
    },
    {
      "id": "6f023ac6-daf1-46a7-84c7-65c2c7ee17d1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "07804ef2-5d9a-4de2-8f5a-d86eec1fa9c7",
      "target": "49336bf1-3f56-4de5-a119-ba821d418b57"
    },
    {
      "id": "ff22f8e9-dbf6-4280-9e84-cb712ba57bfb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f3a9db1-c355-443d-b52f-799742a304ff",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "90afe284-7617-4098-a123-be5767f0bf53",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8fb9abcc-cc6c-475b-8895-8f74b77c9404",
      "target": "a1bac567-a747-499b-adc4-6c41c1e16958"
    },
    {
      "id": "22669910-2647-4e0b-951b-a7947e817e37",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b7659cba-8d5e-462f-9ab3-347cb749738e",
      "target": "19a7a140-b6e9-4b67-962c-47e03263fdbd"
    },
    {
      "id": "e62db8ed-94a6-4547-be44-27569bdab1d4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c909d0d7-1b1e-4369-816c-5de352b60e77",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "ff106858-40d1-40ae-8aee-d61cb20d927c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e6351e4d-1ee5-47b9-9a06-ef950fc32d09",
      "target": "08e1b03d-b47f-4796-a7f1-f4271cd651a7"
    },
    {
      "id": "609f0899-50c7-46cb-935c-0a3286be1722",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5b145c92-d032-4fc6-9241-2136ccf2ada5",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "c1820a4a-7214-43cc-a1f3-b1adcb54f932",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "456c7aac-a41a-4616-91b7-3aff7e51c3b6",
      "target": "a1bac567-a747-499b-adc4-6c41c1e16958"
    },
    {
      "id": "1b272e8a-24f0-44ab-b29d-9b1107234ae1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dcb7ba91-784b-409a-bc4f-682f974ce1df",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "908c8b56-57c9-4304-bf76-432aa5818910",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "039dc981-aad5-45bf-9d62-9f3bd307a687",
      "target": "fa50393d-0a70-494e-861c-8430a7e977c1"
    },
    {
      "id": "e23201fe-6a8f-4944-806e-34d778b46af5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "486dfe68-5a96-45e4-a77f-e44ae90988d5",
      "target": "9e43ba68-5400-447a-888d-cf1aa482346d"
    },
    {
      "id": "963351ad-dc18-4691-a018-f3a792044eb1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "176e8d26-f989-4d4d-8f9c-4fbc71a1fe20",
      "target": "a1494274-d2b4-4338-aaac-d8dabc5c9f6d"
    },
    {
      "id": "ea05e0d5-fdd2-4ad4-86cb-25acd1ae9923",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "31386d20-8d23-41d1-84ea-0b21be9fb782",
      "target": "a9f91b09-1a41-4326-aa65-34ec8f13702e"
    },
    {
      "id": "4a0a4624-6de3-46da-b008-f6b0a19fc855",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "30345443-4007-405c-9f52-6fbd826d7fa6",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "0422d1d0-c4e3-4e59-b7d9-6a6fab86a3e1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e962c729-6818-4db3-8d6d-abb3a57b6948",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "e5e591cf-8c77-493a-a4ed-1a2065b310e6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e6351e4d-1ee5-47b9-9a06-ef950fc32d09",
      "target": "6ebfaf8a-c49b-4dae-966b-5b98ecf0845f"
    },
    {
      "id": "e95f8f4f-d381-4b65-b701-be9484d5cba4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "30c97b3d-96ff-4f35-bdd8-4a28204c92d6",
      "target": "75df8751-561f-421d-b5f3-0cf8c5977fcb"
    },
    {
      "id": "c7dea274-3fc3-4269-b52f-d41cb2c84187",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2dffe4c4-85fc-45cf-857c-4088853f1fcf",
      "target": "c2e2971b-ded0-4907-bae2-080098bce87e"
    },
    {
      "id": "b6de7505-e9b5-462c-aa26-a30a33c0f427",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a4ed064-fcbb-4073-855c-a84480a2204d",
      "target": "d8223b51-7cae-4ab9-bd34-4fb7839e9131"
    },
    {
      "id": "e8c00cc5-1efd-4a2f-9725-fa384c33f7af",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5b145c92-d032-4fc6-9241-2136ccf2ada5",
      "target": "b2eac896-85c5-4c4b-9056-83992c89ccd5"
    },
    {
      "id": "9ddc2fdc-8113-4a16-80ac-47229609e3d7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "90a57e9a-23c0-4c92-84ce-efdec4d66868",
      "target": "c1464c19-1f57-47b0-9afc-1efa3eaf5980"
    },
    {
      "id": "29a81306-810f-45c2-8566-d6d61f26de21",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "558b7f08-252c-414c-84fc-28519db57d04",
      "target": "d0bd1867-e7f0-4d97-9f18-63598e8da809"
    },
    {
      "id": "2e884e37-00a2-43f3-9bdf-21e23e1bec66",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b6e0e945-ca73-4e24-ac58-6e1654d18803",
      "target": "49336bf1-3f56-4de5-a119-ba821d418b57"
    },
    {
      "id": "2aeb1c31-844a-44d8-9d66-63f51a32e412",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e4ff2adf-2fa9-4ad4-8953-d551bb3c5d62",
      "target": "0aed227f-09d0-4bb4-9d74-85d3a79a98f0"
    },
    {
      "id": "88552ad2-fffe-4be7-9312-c4a4ca02ec88",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4a381f04-ff79-4fd4-8bfb-84bb740bc3ad",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "8d664a1f-9404-4499-9d77-6de1545cd059",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "62818a74-7d9c-4217-900d-be4fef18de20",
      "target": "2a6b84da-2ad0-425b-bdc2-ed5a98c6c438"
    },
    {
      "id": "fbf10c6c-0675-487b-b79b-473320d743d2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e2eaf31-4b83-45aa-bf91-b14f5bb2bf54",
      "target": "18d4b585-59ca-4df5-af17-37a561234489"
    },
    {
      "id": "cfffa311-11d1-4acf-ae30-d00815c0e26a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1bdef672-51a4-4803-954f-ac9e4765e7fe",
      "target": "85121e7d-ab1c-4602-a387-660417b24fc3"
    },
    {
      "id": "336eba59-c89f-4cc3-a116-3f19a125751f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "199dc595-ef32-4a39-91b7-2e35e4936377",
      "target": "399d3efd-2635-4761-85a8-a3dcb01d5019"
    },
    {
      "id": "789393ae-d574-4d35-bbdb-20544613b462",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "489d885a-e548-41da-9c72-b8150c39b2ff",
      "target": "e91b3a99-b75a-4c28-b57a-a37c503bb5be"
    },
    {
      "id": "7d9ee566-98f3-4f73-8f73-99a02e106313",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b286c9b3-6323-47b0-92e5-e6f80b4ac7a5",
      "target": "7db3ea62-a752-472c-97b8-259f361468e2"
    },
    {
      "id": "cbb3420c-5819-4f89-b5a4-3201dc6816f1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5c0552a2-5807-4724-9185-73d1432b7bb9",
      "target": "7842b310-6cd5-4c01-a231-cc02e0e3039f"
    },
    {
      "id": "8d3ac441-349a-4545-9c7c-3b35b89ae0e9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dcf0975e-c6b0-4fac-a1db-a7faa8f064d9",
      "target": "1441db0d-8176-4bb8-9036-ccbe3ffa6ee0"
    },
    {
      "id": "59abcc6f-047c-4ba5-ab7a-a6f2fd038dd1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f4ddf63d-d4b9-4fac-ac6b-686f9ecbfb8f",
      "target": "028ce9ec-8214-421f-b182-2201332534c1"
    },
    {
      "id": "faaa7c4f-a190-4f51-8093-2ba47359ba90",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e46b15af-34fb-4fa1-89fc-94a2d545e2e8",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "319b574b-6109-4843-9ce5-bc6aabfc1326",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7ebc4dc1-acc6-4f26-9c83-2df3a38d4747",
      "target": "9b4b6115-46dc-4aa2-afd8-a478d35637c3"
    },
    {
      "id": "e355bdaa-beef-45ba-92eb-ededdf6eb08b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "733cdc8c-1040-452d-953b-50afb77d896f",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "0ab91376-c41b-47c5-a39f-5af8c20a364e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e95d76a-2dc5-4abb-9b75-2a67b2eb86ca",
      "target": "9c20e64c-2b33-4311-a118-db7a5605fb06"
    },
    {
      "id": "1fd6b3de-ce36-4703-9e30-8e34627511f9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "edb921da-e644-4301-abe6-96f21c3e4bbe",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "8edf07e1-685f-49ef-bba8-d6b0f6117c27",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5bb08642-7ba4-4435-b0b5-16364c270aba",
      "target": "854ff216-0457-4699-a6e0-d3954662fcf4"
    },
    {
      "id": "0612e94b-c3de-492f-8781-2bb2a7efdcdc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "05c65a11-0ac2-4f11-b8a6-721382c2fea6",
      "target": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711"
    },
    {
      "id": "6effa23c-704d-4d2c-9064-48e7a7f9d9de",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "02f32b03-0703-4d8e-894e-efacfad8cbed",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "10b8c02d-29a7-431a-a521-225aacd1638c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "025fe553-9237-469d-80bf-bb1d4903f5b6",
      "target": "573412c4-f959-4134-9529-1bb6ed37d87e"
    },
    {
      "id": "1adf03b6-3d52-4286-b5d9-f45aef678c24",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7bafeb7d-7115-448b-ae06-26a596892a94",
      "target": "95dee0ff-168b-4088-ac8a-0efd0e139c97"
    },
    {
      "id": "7db1a2b0-bd1b-4d97-b666-9ac01e47c2cb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f435bf13-36a0-46bc-9ea9-593ae30741b5",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "0e9ee74a-db8a-49dc-ae86-0d19d5968821",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "11ac3574-e189-453a-bb66-e6eae0c6e2d5",
      "target": "2e8c497f-849b-4ea6-9ed5-df335431be4b"
    },
    {
      "id": "b31975a9-ee43-4215-a350-6329f3b3c151",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "42ad8250-8d9e-4345-9314-dffb5f15c396",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "717d6b83-53df-4cc4-bf56-f61bd2edb3b8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1a251845-3762-412c-aa8f-150646cf0522",
      "target": "8516cf43-1869-4fad-8eb1-7c95113e9b9d"
    },
    {
      "id": "6d1e01b0-4f8a-47fc-8ac0-217c26716483",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "486dfe68-5a96-45e4-a77f-e44ae90988d5",
      "target": "21c93c18-fbb7-4225-a9b6-95c2eb7c20ed"
    },
    {
      "id": "0aa9c194-0a4f-4b4a-bdf6-d8afcab59f2d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0605b001-eab3-4cf0-8cb1-05ff21e56ea2",
      "target": "fad461b0-e153-4f98-ac16-4db3cb7de1e4"
    },
    {
      "id": "4c707a1e-0125-4898-84d3-a0974f4cd26d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "54759c90-be96-401d-871f-9239720a5540",
      "target": "a61905f5-b2ad-47f6-bad3-108f88a93972"
    },
    {
      "id": "69f17329-15da-43bc-9c61-70d56ca91386",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fc5c34bf-6560-4dfb-9140-0c7644c3c869",
      "target": "5539e3a2-28f2-492d-9894-33d6ccd47a46"
    },
    {
      "id": "d716d396-6735-449f-8f09-8010c9671852",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "33456226-bb85-4d15-9302-437f53a271c2",
      "target": "a9f91b09-1a41-4326-aa65-34ec8f13702e"
    },
    {
      "id": "ffd2e7c5-9a42-40ef-8e22-e57313a1b044",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "70629b79-6c8c-470d-8d50-40264b855ba7",
      "target": "b0684d66-47c1-46aa-897d-6683ac799618"
    },
    {
      "id": "8978f601-ff01-4613-909f-4d9a313cc776",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "947354e7-3823-49c5-b5f1-e3609b465487",
      "target": "a1bac567-a747-499b-adc4-6c41c1e16958"
    },
    {
      "id": "460bf59e-0694-4e3d-a3a3-5f6c7b9f41d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9227406e-58ba-4133-a0ed-adccf128a9f0",
      "target": "d4e523ed-b9a3-434f-b93a-2e98466b5d8e"
    },
    {
      "id": "70b95297-4120-455b-b8e5-724d2579c4d7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b309cfb4-3234-4975-9b94-b42aea1ea4b6",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "ea33aaa0-13e0-4659-95cb-c193c6d36486",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "71340143-aef0-4ebf-8097-11095502fb3b",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "50481e32-d74f-4c0a-9250-8edfd256f4aa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "34f5c8af-56fa-4dbe-9343-6867aced0287",
      "target": "b2eac896-85c5-4c4b-9056-83992c89ccd5"
    },
    {
      "id": "ec05a302-e16a-4366-b2a8-6eb01227ce56",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a1ce2387-0537-4187-8df5-210d9e614adc",
      "target": "b97e7863-c538-4d4a-8e8a-584191bd1860"
    },
    {
      "id": "8b0505d1-fc07-4c07-8150-fe1e8ecc28e7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7ebc4dc1-acc6-4f26-9c83-2df3a38d4747",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "3f6aca29-e55f-40d6-8d13-5f5d8ee25057",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0266f508-64f2-4239-916b-01946cd04f25",
      "target": "99c05d67-336d-4a26-bd7d-41a2d2354474"
    },
    {
      "id": "1813cd54-e5c8-4dc1-bef6-f2867b470dc0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d1b77d5d-4980-4977-9643-f7a07aeb56cb",
      "target": "9411180f-98f1-47ff-a7c2-9a839b02200d"
    },
    {
      "id": "757341e8-489e-4381-8767-a5df3e3fc034",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e95d76a-2dc5-4abb-9b75-2a67b2eb86ca",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "759d0419-ffc7-4b24-81dc-9d7594f5a086",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe12bffe-7408-425b-9dc4-c5ff28606f54",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "0acc1981-bf79-4a99-aa01-d49fbb91bc79",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b71913d-fef4-422b-b086-862ba35ab1c4",
      "target": "227cb142-e0c9-41f1-9255-7c2170038d6d"
    },
    {
      "id": "f4563c31-7f25-4e24-84c1-3370b219663d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f4bcde0d-96b3-467c-b75b-58c8060a0109",
      "target": "c5226217-a767-4196-9325-211d20b82217"
    },
    {
      "id": "a6fe8b37-ff39-4cfd-a7e6-e9191ac807d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fae0ae6e-0827-4557-ad47-54cd34bb6ad4",
      "target": "ae4373bc-c636-4a52-bc43-ce8c98a651c4"
    },
    {
      "id": "014ed3f1-5424-4f78-8923-a0196274eaca",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "70629b79-6c8c-470d-8d50-40264b855ba7",
      "target": "715ecf13-bab8-4db9-baac-977e05948622"
    },
    {
      "id": "e8840e34-77c0-4506-99a1-77449459b826",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7cd320c0-ec71-422f-806e-ed8d85426265",
      "target": "d5e07e50-58f4-459d-9c4a-c9e1cbad9865"
    },
    {
      "id": "04c4189a-7390-40f0-bb9c-19f7e247d8d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e46b15af-34fb-4fa1-89fc-94a2d545e2e8",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "6fe93fbf-a4d1-4fe5-80c5-47ba0b39fc2d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c5ab9000-3f63-4397-aac3-acbbbcaeb90b",
      "target": "aba0af96-afcc-4c49-998c-bc5a1d1b32e0"
    },
    {
      "id": "5c916d79-2a75-42ed-825e-8381ca287b40",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5366f0eb-e298-4455-a99a-167723d55aed",
      "target": "993eb1fd-8279-42e2-857c-988b0036c964"
    },
    {
      "id": "1571c355-23c5-40bc-b1bf-6216aac3815a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ba86f023-20ba-48f7-9a00-d4974d3dfca7",
      "target": "5962a57f-8eca-43c3-bff8-21ab2f8ce1b3"
    },
    {
      "id": "566a32cf-b7d8-42e5-a2bd-86625d68242d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dcb7ba91-784b-409a-bc4f-682f974ce1df",
      "target": "6d915a0a-0e83-4337-98e2-3b8b63d44611"
    },
    {
      "id": "b521a839-f1dc-48ec-a5e5-92e10d48e0b2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a76e868a-cb4b-48df-8aab-413c84aea198",
      "target": "5ee74a57-0f78-4b3f-88a5-4f04ca1095d0"
    },
    {
      "id": "10d70808-8c0e-44b6-a2ff-2a568671c650",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dc709f38-22f8-4998-8698-2fac3dfef097",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "be58e908-631a-406f-a937-2699b48f9c19",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a90286d-d304-4030-abc7-779ad5a0a4c2",
      "target": "fb158f0d-bff9-4e34-bc1a-6ab38e24275c"
    },
    {
      "id": "d55ca58b-3d5b-4c30-829b-3b1d40e2406f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe67d5dd-86f1-4eaa-9a2b-4091c57b63b5",
      "target": "2b36cc57-7f12-410b-9fd4-05de5bf1b745"
    },
    {
      "id": "8d31765f-9d01-4f31-ab25-d4765555d75c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "20119420-2788-47bf-88b4-7daa6dd24c09",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "90e689a8-71f0-4131-b419-dceb8f41c648",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "84ca26ce-4766-44fc-812e-c1d0bc3e897b",
      "target": "b0684d66-47c1-46aa-897d-6683ac799618"
    },
    {
      "id": "8f795c57-870a-4b9d-af87-c342fcaed295",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6753f7c0-881d-49a2-aea4-22b2ddd11f9b",
      "target": "8774b975-8813-4fe5-9f14-1131e04c9e58"
    },
    {
      "id": "67542999-9a67-42cd-bf18-293a3e726d97",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "31386d20-8d23-41d1-84ea-0b21be9fb782",
      "target": "06a527f6-0f5a-492f-ae67-cc5a2bac1d9f"
    },
    {
      "id": "24aee42d-0c94-4401-a101-e00d8cf06cab",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9daa4c6b-5db1-4ac2-92de-4b8bd1b26986",
      "target": "baa1b8c4-a2f2-4967-805a-9d621cb9d8a5"
    },
    {
      "id": "1d333d15-d7a2-4130-a3ee-7381bf1fd6a9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e738f426-ebb4-4def-a89a-1fe83bdd69b4",
      "target": "8375e973-2090-4db0-a26e-6a0475b46baa"
    },
    {
      "id": "35912ab1-c20b-423b-a2d6-e67b9b1f6aac",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d1e20c19-9cd7-4efe-b477-a80d4189d9ed",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "096e590e-ffab-4fef-8cc3-44c2dd397172",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "96197637-2c00-4c9a-bbaa-56f278458c45",
      "target": "c2e2971b-ded0-4907-bae2-080098bce87e"
    },
    {
      "id": "5478fd82-c96a-426f-8dc7-7934516787fc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "007e99d4-c9a1-491e-8dc1-804844476520",
      "target": "b68fa715-f849-45ad-96af-679a5d7dd4b3"
    },
    {
      "id": "6e760c84-ae7a-428d-a0b2-bceb45249530",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6602c36e-f371-4b04-b662-000a779f0e65",
      "target": "615e3fd7-1d32-4ec3-aa57-57758a40f836"
    },
    {
      "id": "40242e28-5344-4417-9574-4c98443962fb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "81e0dd1f-2c0a-4a73-93ac-b7d87d8318d8",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "c4a95e2d-5b85-4542-95c5-cf1196faa285",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c156bb21-e68b-4cb2-9427-2151b90f3788",
      "target": "b97f3ec2-ceca-42bc-b1aa-ae582b17f352"
    },
    {
      "id": "b302d1ed-2169-42f7-9724-2536de4027eb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "297c9aca-665d-44ae-b444-47c6dbb3d7d9",
      "target": "18d4b585-59ca-4df5-af17-37a561234489"
    },
    {
      "id": "06888fb2-4934-4bf5-9840-175113457ab6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0cecd1f1-0006-4815-8f72-f93c2cba356e",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "c3a7167e-4835-442f-9045-f688181d42f0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c70cee58-e586-420a-94cd-54adf1d8354f",
      "target": "e03458ed-c552-4beb-ad53-a4bcfb6c7911"
    },
    {
      "id": "d7e416d4-13e2-4aa3-b884-fcfa36bfdeec",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9525cfb5-845d-4146-b9f9-aae31ece2dcd",
      "target": "d8c8ca68-5078-4193-9a89-179ed2b4a933"
    },
    {
      "id": "8ca3e67b-1158-4bf5-b969-44477685b20a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "275e66ee-02e4-4085-a5ff-7b0b7dac5cdc",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "f0dc91a0-cf12-4ebc-9221-4f433250dd7a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0266f508-64f2-4239-916b-01946cd04f25",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "8cb19d89-ba14-40c0-94a5-59e8f59c1815",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f538153-0ee0-4510-aaf5-3e7033b34517",
      "target": "26dd0c26-a0cb-4aba-b1f9-c287ca9782de"
    },
    {
      "id": "2906ecc4-9ffc-42bc-975c-48c41517b64e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d2bbc6f3-8c7e-444a-b7c6-31f8a1ac4470",
      "target": "fc67fd7b-1f1e-41ee-b212-1d604438da10"
    },
    {
      "id": "64106b1b-11be-4935-94c6-92e22081bf15",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b1f572eb-a2c4-4f90-87a4-112e5fcb1a0c",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "cd334ef4-695e-4652-92f0-549577769def",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4ad846c6-2692-4b3b-85c4-cdc0cc9bedf3",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "30c16b8f-bfa6-4c80-a0ef-4dee43f9277c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "43a75144-7d51-4ffc-9bbb-e7ad0dec43eb",
      "target": "9b0de91a-8766-437d-a72f-a06e2d88853c"
    },
    {
      "id": "c468471d-c73d-41ec-a995-a0a1ec2f61a2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "30345443-4007-405c-9f52-6fbd826d7fa6",
      "target": "cdcf10af-6671-4720-9a23-ae6d17d87aee"
    },
    {
      "id": "8e418d2c-d5e7-48de-a839-d92703b358fc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "96197637-2c00-4c9a-bbaa-56f278458c45",
      "target": "6f801393-04ad-406d-8166-68b43c92b514"
    },
    {
      "id": "40e97525-d944-44f4-845a-b5e00a73de19",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7bd352c4-7bb2-4af2-bc38-740c70f3b15b",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "712b6fe7-5e36-4a3b-9f53-929c0110ad50",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1d2cd6a2-c0ed-4b7f-9ded-67bb51411e78",
      "target": "7db3ea62-a752-472c-97b8-259f361468e2"
    },
    {
      "id": "bc76efee-e200-4834-b386-81a565e285c4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e738f426-ebb4-4def-a89a-1fe83bdd69b4",
      "target": "8774b975-8813-4fe5-9f14-1131e04c9e58"
    },
    {
      "id": "905d68af-f18b-47e2-a663-9201cf61ce76",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c427ae4-b5fb-4b5d-a4fa-832a9865faf6",
      "target": "4ef3e1dc-1337-4bdc-b611-284216966c1e"
    },
    {
      "id": "fc3c7b98-ea1f-405d-a32b-7a910e7defd9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29fbfef5-4427-454d-a253-9453fc041f17",
      "target": "477c3d38-36b3-401e-aa61-9b8776ede2ba"
    },
    {
      "id": "581675f0-1d07-4a39-82a4-c9aff69c76a5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ee21cce0-bec3-42b6-9fb8-612868486015",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "85642ab9-3b4d-4cc1-87e8-3a3c6d283be4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3650a107-d8f7-47b2-b9bc-b6ecc12f59df",
      "target": "c5eb77d4-d9de-4d87-8aea-b89ed1bbee8e"
    },
    {
      "id": "4541a10a-c541-4f28-a76f-bdf6d1aecdc9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0e6f4b56-a4c8-4418-8953-6b0be0e2d23d",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "c87534e0-fe53-4306-89c7-87cc687cbd1b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bd82f509-9eb3-483f-a861-7b962a10b332",
      "target": "92138297-f7fb-469d-bd2c-9b2aa2fb15e2"
    },
    {
      "id": "b54f81d4-98db-4f12-bb63-e082c61b6dfa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7cd320c0-ec71-422f-806e-ed8d85426265",
      "target": "08f4f061-0650-4739-8a74-cec7ce312bfd"
    },
    {
      "id": "42b84b59-fc09-4c12-b08c-b0e6b0978dfa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a4d8c09e-677a-44e8-a37b-dcbef16bdd5c",
      "target": "75df8751-561f-421d-b5f3-0cf8c5977fcb"
    },
    {
      "id": "d9fb6563-ff2d-4557-abb7-7afbd1642433",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7cc8c318-8106-4a4e-ba77-a7c47ca24ca2",
      "target": "fc8e4b98-8df7-4c9a-b365-24d9f2e7aeab"
    },
    {
      "id": "5078dcc8-c00c-4a00-9753-26f3be453d58",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0ac3a52a-b636-486d-b873-19585027154d",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "57e604e6-287a-4609-9f1f-7fb291fee6c7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c3fa8c85-a135-40cc-ae4a-54e0b14e02f5",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "6a670ae1-b87a-4c1b-ab8e-f741ef6d42a8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a5aa1bce-38e4-473c-af03-739429061381",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "67ec509a-6602-47b8-b8fe-d176995b940a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "12074389-c8ff-46c8-a9da-5b83ff9f5a13",
      "target": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711"
    },
    {
      "id": "4f23fa47-220a-4747-a3f0-19a9df6ee36b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cfd674ee-87ea-4223-a221-d89e8d21fe9b",
      "target": "106e349b-7453-4eef-bfdf-50970a77876b"
    },
    {
      "id": "e37e859b-7591-416c-938c-7b523e7ac042",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "16a73c60-6c02-485b-8220-d2898a20bd3e",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "01833df2-7653-47bb-8c55-499d29bc7a38",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d97a60cf-a68e-484e-b170-d32f512e7f46",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "6bcd5291-f618-4fad-94b0-fffb071f04a5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b8d045a-9292-47f7-828e-df2fc14df240",
      "target": "463847b0-d002-45a5-a7aa-c2178b0a2291"
    },
    {
      "id": "094ab1c8-51db-4d5c-ba3f-f0b1ea223de2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "adb0c5fa-92c8-45cf-ab55-a6a674c9cb3c",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "ef9e6812-1efe-4722-be0c-117aa09ea2b5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dcb7ba91-784b-409a-bc4f-682f974ce1df",
      "target": "a59ecc9c-bc8a-4f4b-a25a-fee4c8368d8f"
    },
    {
      "id": "d616f744-9f87-4c19-b821-763a3c890b45",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d1f95e8d-b1d3-45c6-a24b-496e2ef6c455",
      "target": "15c038c2-9e5d-4ac3-9d5f-f7da404a5530"
    },
    {
      "id": "d0af961e-73b1-4358-be23-d2d66c831f6c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0a4e82da-b12f-4262-a6aa-3ae704d5715e",
      "target": "dc93409a-b1e8-4fea-b774-31ca3fb9fded"
    },
    {
      "id": "7196259e-8653-408d-8f32-ecb14129609b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "05c65a11-0ac2-4f11-b8a6-721382c2fea6",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "4f1f4364-94c7-490c-9218-37c1249d6e10",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e40553d4-6795-46e8-88df-fd87d5a34a9f",
      "target": "946d1b1d-07a1-418a-b0db-52f881237945"
    },
    {
      "id": "f96ee74a-333b-45d5-ae3f-b7ef2e25ce15",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd30e3d8-081f-4d41-a170-127df79da289",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "3c89485b-77a8-48ba-a69b-5d2aca297817",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5ac07153-1805-4142-a9ff-753af0d12264",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "75f92c44-3e29-4656-8d49-9070fa532563",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "176e8d26-f989-4d4d-8f9c-4fbc71a1fe20",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "7358e4de-8690-4383-b9d9-6ffd92f166ce",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "255ac304-0cc0-460a-8e88-6f9ba726989c",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "25426cba-f642-42df-a04d-c826b8809edb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "778cb09d-d5cb-4bd5-b647-4f0a277b923e",
      "target": "a493d447-138f-4c22-93e0-575d7b87e8ef"
    },
    {
      "id": "b0b2ed75-4e5c-4c95-8502-e823980b691f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6e503e88-d6f0-4db3-a8a3-4ed4e09a631d",
      "target": "cdf0bc7f-54ae-44f5-b230-a4dcda8a9442"
    },
    {
      "id": "afcaacc9-dc1a-4011-8f20-339a444a72a8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "df3dd182-4c18-42a0-b812-1e6e13c5dc9e",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "86722fef-2922-4148-bb03-7738d6e9cc66",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ffc24834-8795-413c-8279-f9ad7ac19902",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "8cf763a8-a5a6-42e0-ab74-65e9a0b755fb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cfd674ee-87ea-4223-a221-d89e8d21fe9b",
      "target": "84ecfde3-5f13-4069-8b89-29c6f293ae1b"
    },
    {
      "id": "ca492abf-ddbb-40af-91ec-ae5b4a122387",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe17cdf6-95ac-41b2-9b46-2e3f790cf967",
      "target": "6ac5c52d-be33-45f2-8be6-c0de9011de32"
    },
    {
      "id": "d02f6033-06e7-4afd-8e7e-9fffc354308c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c19273ea-02a2-458d-bc70-684d1f30d4f2",
      "target": "c6922f5d-8375-4c4a-8560-5e47f79300f0"
    },
    {
      "id": "c5a95a65-0250-498d-ba1f-7a67df7377d7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "78465e07-e451-4fee-bc19-8a7f4470b2ed",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "bf45d4ba-c051-4ca7-b745-8354e8a5fe59",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "64b3645d-500a-4543-9d68-11de7f3243fc",
      "target": "c7ca8b19-1dc0-4195-9883-fb3e678444d5"
    },
    {
      "id": "b5bf99ae-b304-4bc3-982a-513b0449b0b5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e1b8a148-5b29-455a-8818-bb32214df335",
      "target": "55360bf6-84f3-4400-b69d-c189c466d86c"
    },
    {
      "id": "53738459-dce0-44a9-a8b3-9c8e9735ba0a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8aa0182-1afe-4bbd-b355-110264135f14",
      "target": "fc67fd7b-1f1e-41ee-b212-1d604438da10"
    },
    {
      "id": "aee6f399-e258-4d80-9ef6-245978112b0d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ee6220a6-c0d0-49de-a88c-af4bf8d5d8d0",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "49762fc4-78fb-4af4-9b90-2d714129bf41",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b6e0e945-ca73-4e24-ac58-6e1654d18803",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "2b2fc1fe-ad46-4c20-aa36-799d36bf3b6e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6768c0d4-60d7-4618-958d-667540dd8ba6",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "9d8a172a-2a52-4d33-9f4e-f071a8c452cb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "46187658-fad3-4b97-a0de-c7dec8bacf30",
      "target": "d3a831e6-b684-45f5-b96c-da45411236fe"
    },
    {
      "id": "33071ef0-1686-4bd4-937e-ca95e9826aa0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "28b0413c-2f34-41b3-863f-468642ff1ef4",
      "target": "b68b9025-b85c-4e7e-b179-bc5ee5186732"
    },
    {
      "id": "2e002f15-c111-4e0d-a2c9-35b3a5b0a3d3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "297c9aca-665d-44ae-b444-47c6dbb3d7d9",
      "target": "f4cbf489-1440-41ba-b6e1-59317fa893c8"
    },
    {
      "id": "d7eba08f-6bdc-43a3-b80f-431894689697",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2c5e1cf7-4bba-47f8-b40d-1063adb3da74",
      "target": "3930034d-a6d8-4173-9177-b4b4320b0620"
    },
    {
      "id": "2cbcf59b-8c3b-4d7b-b609-7983acdcc6f8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "32fa9e87-4068-4041-845a-38463f418497",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "84c0eb05-5996-4b55-8300-b73399f82169",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "725dbd08-45c9-4cd8-bc80-e1a9d736f4f3",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "bda72974-dc4d-436e-8e80-ce49a706d37f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "64321fb2-03e0-4455-b93b-731447c11b1c",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "9fdc5008-7ecf-4613-968c-eaba63768f80",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d7750e37-3c50-4de0-91e1-84a5610522df",
      "target": "f5243f40-93fb-4ac0-b92f-c5e5cb19cfd6"
    },
    {
      "id": "f8b120ae-9e71-4edb-a2b4-0bcff398399d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a5aa1bce-38e4-473c-af03-739429061381",
      "target": "3cf6c5de-fb7a-4272-96c3-b2cdc46a15e2"
    },
    {
      "id": "ccea5050-0557-475a-b223-d8ceca8f8da7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "80010e00-e158-4d86-9c1d-477d3897c0c9",
      "target": "234384c0-d041-4770-9310-57cf26e7eed2"
    },
    {
      "id": "78d736f2-b2eb-4cb2-8586-7ecebf0e9252",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ac6db081-a855-4ee0-9849-bf98526e9fbd",
      "target": "45b9f239-2e9b-4b50-ba6c-95712a540eeb"
    },
    {
      "id": "8e652766-0312-4f1b-9e6b-7c21923a0065",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a9a7112b-c56e-478e-aed7-51200fb9d404",
      "target": "9d2625e7-a6ac-4434-8caa-3c1dc5bae9d6"
    },
    {
      "id": "9d14a2fa-6cc4-4a28-8b16-f79a6776f463",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "119b1a90-0eeb-45a1-a354-7230019ea377",
      "target": "08e9259a-7d11-43f3-b344-0947dd58ca7b"
    },
    {
      "id": "21802325-de4a-4a90-8939-47bb9c8966af",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9295edce-46ff-43b1-b9be-c6b524629bb3",
      "target": "6f5c6b59-0021-4e20-aee8-83473b355f9f"
    },
    {
      "id": "1f197baf-85aa-4a01-bef0-4ebb8d36936e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "40301944-5e3f-40fc-9345-e51e36153f4e",
      "target": "b1b36864-cac5-46a3-bfd5-6b58f33fe1bd"
    },
    {
      "id": "60ddb272-86ca-4a23-ae17-8e4a6f4bb58d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e40553d4-6795-46e8-88df-fd87d5a34a9f",
      "target": "79b1f159-6629-4bce-9cf8-4286aefe1077"
    },
    {
      "id": "33d4d83b-fdaf-4383-96ff-c07712258697",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "63371595-93f3-42c2-aee8-2a487612d88e",
      "target": "afd1fc77-13d0-472d-8deb-5957725f3a14"
    },
    {
      "id": "77f672c4-df46-4783-836e-38b61ec3934f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4a381f04-ff79-4fd4-8bfb-84bb740bc3ad",
      "target": "bc649b88-aed0-4294-b632-26b7c5509647"
    },
    {
      "id": "0bb4227d-6b0a-4d29-8abf-150c2a91fd14",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1bf59584-2fda-4687-9626-144d4c9a37a8",
      "target": "49336bf1-3f56-4de5-a119-ba821d418b57"
    },
    {
      "id": "42a3871f-eaee-49da-9167-f886c308801a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "10342fe0-56da-4958-91e1-48feeac43c4f",
      "target": "9b0de91a-8766-437d-a72f-a06e2d88853c"
    },
    {
      "id": "9ad86941-16e3-4d1a-907c-5b007dabd8bd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "13fd2af5-8aac-4a11-8bc9-d3f162fd915d",
      "target": "db76de8a-63eb-4342-bd62-860da9170520"
    },
    {
      "id": "3e7f8112-8365-43b3-8afc-7b781e0a429f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "23c4ac2e-b19e-47e4-855c-06a1c5af033a",
      "target": "fa91de5b-025a-45c5-8e88-b0c469f8ae76"
    },
    {
      "id": "13f58341-3b45-4e38-b8f3-a08bb89518d3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d3a322c4-4104-45ff-a6fc-fb94767c46d3",
      "target": "994114a6-f1fd-4903-82c1-12f112acd73e"
    },
    {
      "id": "3795db6e-bd61-46ad-a02d-921d7534557a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a9a7112b-c56e-478e-aed7-51200fb9d404",
      "target": "a1bac567-a747-499b-adc4-6c41c1e16958"
    },
    {
      "id": "54131e83-dfef-4eb3-a888-6c0eb8ff63a2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ee21cce0-bec3-42b6-9fb8-612868486015",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "c3192554-f895-4d87-b40c-01f3d698e2a7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "28a49b42-e42c-47d3-af49-2636b36fd23d",
      "target": "7a0b02ab-0b14-4406-b83b-628a0c8825f7"
    },
    {
      "id": "e8417d3e-6d2c-4fa7-9a7f-8b190759626a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8c4508f-b76e-4fb9-8995-55bd76ac60c0",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "b76a28de-fa3d-452a-826d-427782bd4a9c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "628738c8-d9f5-4c70-9422-581c498224c9",
      "target": "1ed35ca2-f295-44cd-a0bc-d637810180d5"
    },
    {
      "id": "dfc7be0a-8631-4213-8d90-94f8affa5426",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0d92deb9-9942-46fd-9204-a3658ef998f1",
      "target": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8"
    },
    {
      "id": "fd9ba0cd-62e7-4649-909f-44a2fb1ce247",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9d3429c7-5209-44a6-924a-5e413cba729d",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "d41c86da-d6ae-48e8-802c-94f18663d772",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e2ce5fa5-108a-4b3f-b95d-4175d695f41f",
      "target": "8dd2f1c4-9b6b-4a8c-9953-4376366fc2d1"
    },
    {
      "id": "714835fb-3d31-493d-9a3e-a40ca0ca6754",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "324d6dab-41c0-4e79-a336-a2936d7d414a",
      "target": "18d4b585-59ca-4df5-af17-37a561234489"
    },
    {
      "id": "0a23065f-4dbd-480f-b122-4c643b29b931",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ac6db081-a855-4ee0-9849-bf98526e9fbd",
      "target": "968bc5c4-ed19-4657-a9a2-e20cfbb645be"
    },
    {
      "id": "c202de00-7448-4efc-863d-5aabf44b1d71",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a2beb18f-7f64-42a7-9bfd-06e9e60869f6",
      "target": "d171efb6-90a2-4188-8afa-8cd98736269f"
    },
    {
      "id": "73ae346a-bb7a-4f4f-9296-5ed5b900386b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e02cca10-c1d2-47fe-aa61-ae6e7cec1ef9",
      "target": "49336bf1-3f56-4de5-a119-ba821d418b57"
    },
    {
      "id": "3d3bbbc3-5d4f-45f1-90ad-1b41a71f90a4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d522c613-39bc-48c5-8b27-3353de85dd89",
      "target": "6b89c32b-c9c1-4773-bf5c-c246c94bcad8"
    },
    {
      "id": "c2156161-3516-49c7-bf44-2528de70c7a2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe69a11a-019b-4542-9cd3-ab7c8ea41b1c",
      "target": "06eb85c6-e6e9-49f8-beb7-d081a86d3a5a"
    },
    {
      "id": "98dc6b88-2644-4923-ac67-c1d3995a7a07",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "025fe553-9237-469d-80bf-bb1d4903f5b6",
      "target": "532e502c-6505-4af4-b280-37dd3a4b44a7"
    },
    {
      "id": "b30a8776-e734-4d0e-9da2-da6874cd4499",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bb1fbef1-6272-47f9-9086-920e36b2adbd",
      "target": "bf188921-bad1-4513-8ff7-edf2a0f9f7da"
    },
    {
      "id": "7f2e68b7-9f44-4c2c-a926-38a48e765ceb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "48b557b5-2939-40d2-872f-e08597c57224",
      "target": "75df8751-561f-421d-b5f3-0cf8c5977fcb"
    },
    {
      "id": "d76d00f8-89e1-4689-997d-631ad7108465",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8b17424b-eeff-4098-b8f7-7dfb58a681da",
      "target": "933fc378-2d4e-48b2-a457-56fb9e2aa341"
    },
    {
      "id": "6c552c60-1314-4fdf-9a39-3e9bfa7454e2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3d9a251a-4cb5-438a-9ef9-c429f4eb4597",
      "target": "8774b975-8813-4fe5-9f14-1131e04c9e58"
    },
    {
      "id": "16f8c9d8-8942-4412-997f-5f7b54b6fc88",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9d3429c7-5209-44a6-924a-5e413cba729d",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "310cb46d-c9bb-4e00-bc6a-12eb3e37ab18",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b74bbdb6-20ae-4afb-9921-1d791201d62a",
      "target": "9aac7248-089a-4399-b377-88d938712ad7"
    },
    {
      "id": "af6747b9-4a16-4a6e-bd87-cb306fa6747b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "64321fb2-03e0-4455-b93b-731447c11b1c",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "72fff27b-584b-4773-a3ac-fc333d087812",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "778cb09d-d5cb-4bd5-b647-4f0a277b923e",
      "target": "22ec5644-2aa8-4e00-a6f1-49d171521ae6"
    },
    {
      "id": "71799816-079b-47ef-8f6d-6a7492784f19",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d7750e37-3c50-4de0-91e1-84a5610522df",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "6a34dd38-2c6b-4b3a-a0f9-9ada466c8d9e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d97a60cf-a68e-484e-b170-d32f512e7f46",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "fdeb7ed1-f63c-4cc1-b8f1-f940192f5f07",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3bf6ca2b-357f-4506-9d56-761b7619ba32",
      "target": "b8a2f958-c4af-46ed-9d60-05f32043fcc0"
    },
    {
      "id": "64f4dc41-2506-476e-8840-61843f0f93d5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8ba72e8-0aaf-4d4e-a8e6-60720f3b38b7",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "58a89f42-7180-4a99-9a01-b74bd5aaace1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d3a322c4-4104-45ff-a6fc-fb94767c46d3",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "4bd9c4a0-c193-4eb0-a5b4-a1057675d3d4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1b681072-4e3a-44a2-932a-d22fc943f75b",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "8ee415a5-cb96-4652-b2e5-aff522eeb7dc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f091bf9d-b5dc-44d4-acdd-4be427f7bffb",
      "target": "d8c8ca68-5078-4193-9a89-179ed2b4a933"
    },
    {
      "id": "22d91d4b-c9a7-4922-8ead-726d314a1de7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4b9e81fe-c14f-4fac-99cd-025ac79bc6fe",
      "target": "1ce973c3-4975-4c4f-9282-eedf8d5b91af"
    },
    {
      "id": "30e68770-1bcc-4b5d-859b-3b86fff7a5c1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe67d5dd-86f1-4eaa-9a2b-4091c57b63b5",
      "target": "25144b6c-d2c6-4754-8e7e-bfbcd69cab0a"
    },
    {
      "id": "d6b73d9f-4474-4a10-8dfc-1ef7d8406b33",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e882080d-a396-438a-bb19-22913e709188",
      "target": "83a6d517-1539-437b-b4d4-1603f10f5f4e"
    },
    {
      "id": "5272d7fa-48b6-4484-83f6-c9bc7103fa72",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7c3013f0-2e0f-45ea-b954-6ed3cce5e210",
      "target": "234384c0-d041-4770-9310-57cf26e7eed2"
    },
    {
      "id": "b52d64f7-b516-4ddf-810a-6e5afe50808a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "49b01e47-e09b-4199-8ef9-780c0cf9b9f2",
      "target": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711"
    },
    {
      "id": "c7c9a5d0-7a8e-4523-bb88-52b1c068490d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2aea9b34-1a30-4ef9-a8e0-8c7520b5d57e",
      "target": "27590593-7b7b-4aa0-a0b7-1ce7a5fbba7c"
    },
    {
      "id": "fed582fa-32cb-4314-abb6-c68bb006ffab",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a751304-811a-42b8-bdd4-2b281d13e752",
      "target": "01acd508-0789-4d70-84b0-53e62aa7c291"
    },
    {
      "id": "106820d7-a72d-4459-be6c-1595b61ab3f6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e749af9a-e3bb-411e-a2d7-73593b9539da",
      "target": "6ebfaf8a-c49b-4dae-966b-5b98ecf0845f"
    },
    {
      "id": "0aadc5ba-1c15-4258-8220-ffac031e4a62",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3012f674-523c-4c81-abe3-d1be9e2de3a4",
      "target": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711"
    },
    {
      "id": "1ed1b75a-41ee-4d73-b546-1613a233e4bc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e2eaf31-4b83-45aa-bf91-b14f5bb2bf54",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "220bc0ab-654c-457d-9d0d-ff178b5890f3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b7c687cc-c102-4c09-80d1-717a29244053",
      "target": "4e96ee15-395f-4cd7-aff9-d6c962807139"
    },
    {
      "id": "8693ab11-2e25-4899-aeb8-e133c3809716",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b286c9b3-6323-47b0-92e5-e6f80b4ac7a5",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "590d58a7-99ba-4a1d-b9f6-f3c9809ec3f1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1c0c3120-679c-4f69-9f8f-c5133083c49f",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "a0f5fa7a-b873-4405-977d-a8ce7e033655",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe17cdf6-95ac-41b2-9b46-2e3f790cf967",
      "target": "e1c48b9d-9097-4e4e-a27c-78754ba6a440"
    },
    {
      "id": "189875f8-490d-4ece-a545-25eef06a7b3a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "13acb4b1-84a9-4f3b-a889-9695bdd2f5bb",
      "target": "a69004ca-04ae-4647-96f9-5d5110c316c8"
    },
    {
      "id": "3c9bd010-2571-4b18-8f5d-0975237e616c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "32fa9e87-4068-4041-845a-38463f418497",
      "target": "cd00bcb1-b2bb-401f-9fb7-0bbcf1ecb573"
    },
    {
      "id": "8ff5a19f-dddf-4657-bf16-b8fb60aefa9d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a7dc7e54-627e-4282-bf8f-3f3bd6d68949",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "5582517c-c8f2-4c21-9e7c-bad323cfdded",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "02381b5c-99e2-4114-884d-d72612a2cb57",
      "target": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8"
    },
    {
      "id": "a94a770e-a3d2-4ada-8552-0b19d07a1008",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "93d9bcb9-7815-4463-8025-0f76320b3a72",
      "target": "830d5985-d0e0-4162-8903-4f93ff3b9e5b"
    },
    {
      "id": "6079fd0f-bc6f-4f32-8e07-c6a93717e69c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ae4df9d2-9daf-4e79-93a2-2f9a36cf347c",
      "target": "cdf0bc7f-54ae-44f5-b230-a4dcda8a9442"
    },
    {
      "id": "388cd1ba-7525-4bdf-a4ed-89332f5358e5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d65efd39-d28f-4b25-9ec5-be8fc8de6a35",
      "target": "6bd1e2ff-e46d-4342-8c57-ce8df07db882"
    },
    {
      "id": "07f21ebc-0726-4858-b048-51b82f5efb82",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ae0271fd-9d12-4eae-b282-11017aefd32c",
      "target": "2c7fe19a-cf14-4dae-8172-9cb579909848"
    },
    {
      "id": "4e52d5a6-083a-49d8-aaa0-7dbfe785d4f6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2ec83fd5-52fb-4570-adbb-0980e2c7b6df",
      "target": "8774b975-8813-4fe5-9f14-1131e04c9e58"
    },
    {
      "id": "497e917b-2785-4059-8d22-f00c1f22ad18",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c24a656-9cb5-4d4b-9780-513fa1d2b588",
      "target": "fe743b9a-d96a-4d9f-8fbc-833c4256eaab"
    },
    {
      "id": "4ef3d792-0dc7-4ffc-8792-aac34c8eae7b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "733cdc8c-1040-452d-953b-50afb77d896f",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "936d4261-3f8d-4ee0-af14-77210a0496a0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9a8831d2-813b-4703-ab0b-5948f6b4af46",
      "target": "62a8a0f9-1bab-4736-bbd6-2609eeea9084"
    },
    {
      "id": "5c1afda9-f154-4964-b419-f25d62dcdc54",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "64b3645d-500a-4543-9d68-11de7f3243fc",
      "target": "c8d224f1-2d64-4b96-af78-ae896333c47a"
    },
    {
      "id": "922fe6d2-1179-4c6b-8f6f-e1e1603e4667",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ceec1cc2-9102-4bef-895b-ce5f9b545dbf",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "2e7f4359-5812-42e2-a832-bc1de483cd79",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "49b01e47-e09b-4199-8ef9-780c0cf9b9f2",
      "target": "ac2d332e-9dc4-4d0c-a5b2-8f12818e6525"
    },
    {
      "id": "f53a5d1a-7291-4344-999e-dd1a49a04643",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "87878d02-ce73-4ffb-b70e-ca63580c7f5e",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "67756823-218d-4571-9efc-e327b3e48826",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5bb08642-7ba4-4435-b0b5-16364c270aba",
      "target": "ada85c78-cfe2-41ea-9df8-4bc11d4a2deb"
    },
    {
      "id": "8cd316cf-cbe2-4c01-8b24-27e51d2cc57d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "007e99d4-c9a1-491e-8dc1-804844476520",
      "target": "543fdb44-3d8c-4934-82b4-45ceacafadd1"
    },
    {
      "id": "413ac98a-d5a8-4951-b0c4-3fb684f4db3e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4235532e-1f90-4222-b799-e50d25194326",
      "target": "f3f1ba74-58a1-44a6-b61a-5d207ff0039d"
    },
    {
      "id": "5d3d2105-2d14-440e-b4b1-5088d0e99e63",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5912d4cc-80de-4fa8-aa4c-ba0513bf409f",
      "target": "df2fe4b3-33df-44b3-b9cc-3df8aa9c679d"
    },
    {
      "id": "254d1601-be65-4d4b-8711-722a6c74f788",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a4d8c09e-677a-44e8-a37b-dcbef16bdd5c",
      "target": "cbb75c09-3bdf-4164-9e98-5a6c9830fa86"
    },
    {
      "id": "706f094e-571e-4491-9e5e-a0b733cfff1c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e00457b2-97ca-4b03-8661-5f8af42d2479",
      "target": "8914672b-d344-4b25-9ea0-da98439f5879"
    },
    {
      "id": "5d11e139-3767-4321-b639-88eda101d455",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bb1fbef1-6272-47f9-9086-920e36b2adbd",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "27904fcd-a51b-497c-922b-1c33c410c684",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "324d6dab-41c0-4e79-a336-a2936d7d414a",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "fa80e4dc-6480-4f5c-8629-fb2c2db8cad8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "05f62a6a-0283-4e9b-87ce-2b5700ac248e",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "ebff4fee-be72-4a03-b819-5c317d51e3c2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "717edc30-6901-47ed-9c4d-bab04cbf360e",
      "target": "a4e008d9-e066-4b7c-a5b6-69aa1265ad18"
    },
    {
      "id": "a963eff7-13d6-4f94-8691-b9e13e56e33e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "82909e6a-57a2-45e9-99c0-3cb0ad654e49",
      "target": "5d319933-9196-4d1a-bc86-e7ff4f6880a4"
    },
    {
      "id": "5546061f-d057-40a0-a1bd-d69e383db8f8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ddc4ec45-1167-4854-accb-781a268823d9",
      "target": "a419741c-5b88-414a-bd4b-b8a7d3f192bc"
    },
    {
      "id": "e69690c1-2946-41f9-836b-d48d338dcf40",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ad754385-5639-4fd3-a940-1748bfda4be5",
      "target": "6ebfaf8a-c49b-4dae-966b-5b98ecf0845f"
    },
    {
      "id": "3e0a816b-e401-4023-98ff-0844f7164429",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5366f0eb-e298-4455-a99a-167723d55aed",
      "target": "2ccc512e-0eaf-4050-b6d2-be70558abbd2"
    },
    {
      "id": "d5cf66ca-06be-4b6b-97f2-a402ddd6efb5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c8fca5cb-4ee1-4495-bce4-2099095d0cb6",
      "target": "8d45ca2b-6758-4d50-bf2b-8e0aa96e102e"
    },
    {
      "id": "71457fb2-bc50-4589-883f-bde6477d2f31",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2622ea66-8866-4b1a-b42c-73de3fad34ae",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "6a90b745-938b-4f5e-b82d-50aa4b198310",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1b681072-4e3a-44a2-932a-d22fc943f75b",
      "target": "b3973712-8bec-4305-9b8f-84d1dbc1276e"
    },
    {
      "id": "ed5f032d-7327-4a4f-bd89-e9be49a4337e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f4bcde0d-96b3-467c-b75b-58c8060a0109",
      "target": "07ea41f4-dbfc-4f98-9fbb-4feb033ae915"
    },
    {
      "id": "77318dd8-26ec-4b8b-a32e-6b919360e1a4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d02ae7c4-3851-4453-aece-8594b1604cca",
      "target": "b6c6d64d-bef9-4487-9279-a2b02b2e1ae5"
    },
    {
      "id": "bd34b00d-6b18-4cac-9258-bb4a6e484268",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8c4508f-b76e-4fb9-8995-55bd76ac60c0",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "8919b278-b9ab-4c19-abb6-67633340408d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1ec8b3e6-b2a2-4845-9a0f-ccf45e4316d2",
      "target": "27570dbd-ecc7-4416-84d1-455be99378a2"
    },
    {
      "id": "e1b8aea4-9a10-4b82-ad36-2a59b2169fa6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29f775e5-a87f-4f66-8175-d1b57c0b16ae",
      "target": "5b79e707-5887-402f-9953-2fc1fa419d29"
    },
    {
      "id": "20ff086d-a1e3-4ee0-a2be-af9c78d9df10",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "23669237-8c9a-42dc-a58a-bcf3a6554ce9",
      "target": "1d286897-0a2e-4add-ada1-b69c0de73051"
    },
    {
      "id": "4da59d3e-1cf5-44e6-b2ac-b847030caa6d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c4cc767a-409d-4453-9121-38b916b19737",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "9cb4f2a0-1744-4ffc-9ce8-f8c67c8a6738",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "28b0413c-2f34-41b3-863f-468642ff1ef4",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "0830f313-135c-49c2-826a-c09bcf770967",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "11ac3574-e189-453a-bb66-e6eae0c6e2d5",
      "target": "ed36811a-e178-4f08-b42a-dca8f02cf5fd"
    },
    {
      "id": "e226f7d6-5f92-4a36-bbdf-5b76d087214e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c3fa8c85-a135-40cc-ae4a-54e0b14e02f5",
      "target": "f5243f40-93fb-4ac0-b92f-c5e5cb19cfd6"
    },
    {
      "id": "010ec99e-d0f5-4d36-9772-0903f11d8381",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ce27df86-6faf-4d1f-be9c-d0b109326eb1",
      "target": "7aa9027c-a156-446d-901d-f4e7b5d9665d"
    },
    {
      "id": "9610d09a-b797-4a15-950c-eee9190a5e89",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b81f9ab5-ffe4-400e-9a7b-e5afc612ecc9",
      "target": "543e3b8a-d292-44d7-9e37-28cde3ca0e37"
    },
    {
      "id": "705405f6-940b-43fe-83ed-d8a52f24c5d1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9f0c50c6-1314-4186-8018-b667b804dc9d",
      "target": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8"
    },
    {
      "id": "6b41a881-f703-4013-9592-882c4904ae45",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9daa4c6b-5db1-4ac2-92de-4b8bd1b26986",
      "target": "893a879b-2f65-42e4-a769-1fc0efdcc928"
    },
    {
      "id": "937a297d-197f-4bd5-8950-965a385a0951",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6eb30306-cec2-4b91-bb77-023e0449dc1a",
      "target": "50b43fb5-a600-4bcb-ae9e-b110535b8fa5"
    },
    {
      "id": "d655557e-ae85-453a-9f45-0f6741815769",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c5c0582c-ad7c-4c13-bb69-8b8781c62906",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "1e085644-eec8-4af0-97a3-0d9e2b08b098",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0d857b93-4164-43e4-8912-59d1e291f646",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "3c8847cb-f743-42b7-8d14-aa477d1a2dd0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5e63785e-1ba8-4dd1-8127-5e1c1867269d",
      "target": "b1b36864-cac5-46a3-bfd5-6b58f33fe1bd"
    },
    {
      "id": "5716244d-a3ec-43cb-a918-09baf17ce051",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "90a57e9a-23c0-4c92-84ce-efdec4d66868",
      "target": "5f777aa5-3f38-4bfb-bc2b-3f61f7ac2254"
    },
    {
      "id": "a6d23f52-ecdd-4060-bf40-32533c54aa3e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a75966b0-cef0-4fe8-a203-06b0d5f0ff2a",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "cbb40922-3c01-4124-8da7-010aecfd1a2d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b74bbdb6-20ae-4afb-9921-1d791201d62a",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "a429c020-62e1-4d83-93e5-5cbc12318e25",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "628738c8-d9f5-4c70-9422-581c498224c9",
      "target": "106e349b-7453-4eef-bfdf-50970a77876b"
    },
    {
      "id": "42a62c85-9da1-448c-9c35-397c85e6ea92",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1d2cd6a2-c0ed-4b7f-9ded-67bb51411e78",
      "target": "64c7d764-e5cb-4cfc-864a-02d5b5b9533f"
    },
    {
      "id": "dba62da8-0672-48d4-aaff-279f62b96ab3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3a94bcc5-9f4b-4b79-a8c6-28b83d26682d",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "a0678d06-2041-4ab2-8ba6-8bdaa9665271",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24f47c94-80d0-410d-8823-386b4b1f57a4",
      "target": "69b746f5-69c2-45b9-be70-619c04e9a6c8"
    },
    {
      "id": "ef8540e5-b4f7-46f5-9e37-4478b36c68a5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e95d76a-2dc5-4abb-9b75-2a67b2eb86ca",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "41f2520c-eae2-4c39-bee5-b5a0c09c49ce",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8791511c-c6b3-44f4-9f02-1b31e626c368",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "2c3d8620-7b7a-4dfb-82f1-75b1d4b5ea97",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ba86f023-20ba-48f7-9a00-d4974d3dfca7",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "c8821a76-5e17-4583-80d5-599238c09ee6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "255ac304-0cc0-460a-8e88-6f9ba726989c",
      "target": "9e99f90e-db7d-4bc8-abb5-2d1137e32abe"
    },
    {
      "id": "819556fc-d6b0-491c-8fe7-269fa00a35bd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "abe0f28a-a27f-42c0-87bc-5ab30820a49a",
      "target": "2cc9ad8d-5194-4381-9fd6-58586ad426c3"
    },
    {
      "id": "5739bc39-063f-4eb9-a322-10aef944e67f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d29b5c0b-d5f0-4143-a4e1-7a81f5c75a9a",
      "target": "550de575-4369-437a-862d-9126d156c397"
    },
    {
      "id": "ab8b2696-84bc-496f-8af0-074bcba0d0c8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ddc4ec45-1167-4854-accb-781a268823d9",
      "target": "663a44eb-f3d6-430b-a631-9aaec1a37ebb"
    },
    {
      "id": "a1ed324c-4b0e-4ebb-bdf3-52f5ef5caac0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4ce47ed5-c01b-4930-a91b-ed2688adce7b",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "79f2f103-a14c-4743-a02f-04831939544b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "489d885a-e548-41da-9c72-b8150c39b2ff",
      "target": "ee00bffd-ca26-440b-a14c-0e094f08b455"
    },
    {
      "id": "f3154adb-3eb9-4046-a58c-38b01ebd6985",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f5891c5-b722-4564-97fe-09b0181efcc4",
      "target": "13f47b7c-a8eb-404b-a626-e660f2ba3dc2"
    },
    {
      "id": "c4dee118-f95b-433c-a8df-7b884462e3ec",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bf924006-8ce7-4f92-9d85-fb1857ff4762",
      "target": "cbe91d7c-fff3-4060-bb6f-11a9a75fe1dc"
    },
    {
      "id": "b6b5705c-3c94-4b7a-a658-4bc335907475",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f8eef965-3e1b-4341-b4cb-e074476e96fd",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "145a1ae3-b25c-443b-bfee-e32ce76d78d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2dffe4c4-85fc-45cf-857c-4088853f1fcf",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "17b23554-a6f6-4376-a124-79c8b106dede",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c656be36-f6a3-463a-83c3-3845f047f8c8",
      "target": "550de575-4369-437a-862d-9126d156c397"
    },
    {
      "id": "a50e01d6-4768-4114-b327-216495a98e22",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "00720838-b025-4303-93e6-04fc5cf9a930",
      "target": "0bedc8d0-8434-476c-99ae-50e1e77eb9b3"
    },
    {
      "id": "4a26e9bd-eda3-413d-ae2b-84980c41b6c8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7c3013f0-2e0f-45ea-b954-6ed3cce5e210",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "0688f5f8-c91c-4cba-b601-bbcc541733e8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8991063-636b-463c-aff6-1185836eddda",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "dbd942c8-109f-4ce3-aaf3-f3be48ea9427",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e00457b2-97ca-4b03-8661-5f8af42d2479",
      "target": "1c0fe135-8cf5-4a4b-b9f8-11e1e85c3c15"
    },
    {
      "id": "7ac8972e-7c1e-409b-b64f-d387aa9b56a1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a751304-811a-42b8-bdd4-2b281d13e752",
      "target": "49961b16-94c9-441e-9b98-5e30a3c1838f"
    },
    {
      "id": "76df6509-c69e-4ff3-97db-c71a5f6ae09d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0665f990-ccaf-4370-a952-85cc742f0a37",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "dac26f47-bda9-49bb-bd9f-e81b1b15a201",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1bdef672-51a4-4803-954f-ac9e4765e7fe",
      "target": "ba545ef3-5f98-4872-9496-e69727318b38"
    },
    {
      "id": "575c88f4-10fa-4ea4-b71f-238e6b1108e5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "57b7f25b-a7e3-4e83-8f6d-db0717c81f50",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "0ba6d74c-635c-4f35-bd76-1adef2b3d12b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "92b38b45-2e54-47d5-bbce-f307757fa3a7",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "016f6c3e-f3b0-45f8-a69a-c743eb5601dd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2309158e-ffc0-4a41-984e-35eefdc54be5",
      "target": "f5aa1594-845c-4be0-b91a-a5b3a5d9478f"
    },
    {
      "id": "bca21856-5d90-456e-be17-01e7e691c5bd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5251adc1-caa8-44ac-9f98-3e03f0b5090e",
      "target": "eb73a851-88c3-4276-a438-3bbd078d3c67"
    },
    {
      "id": "b159db2f-3eff-4678-99cb-0f5a3b943d5b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e02cca10-c1d2-47fe-aa61-ae6e7cec1ef9",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "c67a22ae-31c9-44e8-b84a-a189b88c545f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ff2cbd5a-fd38-4d13-b91f-2471dcd72262",
      "target": "d8223b51-7cae-4ab9-bd34-4fb7839e9131"
    },
    {
      "id": "437e8f05-feae-43dc-9a0f-d0f841ca123e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a71e95f0-f2ba-45c7-99e5-dc6992fec770",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "dea9093f-762e-4d92-b23c-7d1284b18ecb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7983d8e2-2ec3-4380-94f2-190455d40f02",
      "target": "42acb4cd-d4f6-414a-bf4d-3e100cf6abe2"
    },
    {
      "id": "53d27130-6c96-4106-af85-69bb5cf287e3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "829c3044-d492-4964-ae5f-5f9a868606ed",
      "target": "dfecd3dc-c13b-4dac-91fd-43f061e563fe"
    },
    {
      "id": "5bbfaa97-8925-4b5e-ab26-c85e234a6735",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9dd69c21-a944-42a1-b1e0-be534030a55a",
      "target": "acac8623-7773-456f-ad72-68b818265ca0"
    },
    {
      "id": "cf26b6a4-060a-409a-a2e9-6a70aaf7d365",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "296bfb58-780c-477f-9660-1d181192ab64",
      "target": "0f4ac7c4-b796-4856-b761-25a57c81575a"
    },
    {
      "id": "af8b8181-bcbe-44c5-9079-4e7f17dc009e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1ec8b3e6-b2a2-4845-9a0f-ccf45e4316d2",
      "target": "f184c5d6-5c64-4b7b-a660-0f709332f24a"
    },
    {
      "id": "b7075593-182a-41c9-bfe1-af0f53c7b5f0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "66bb42f0-8248-4af1-ada2-9201740209e4",
      "target": "9a8bb801-a3d0-4f24-adfe-315662c958e7"
    },
    {
      "id": "d8617fdd-7269-44cb-a602-618e58c9fadc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d1f95e8d-b1d3-45c6-a24b-496e2ef6c455",
      "target": "168fd96c-100b-4afd-bf84-495a0146d4be"
    },
    {
      "id": "70fe1095-42f7-41eb-9caf-1428bdd00b73",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "92b38b45-2e54-47d5-bbce-f307757fa3a7",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "a1471e2c-ce9c-4335-ad68-c60e47f9d5a7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ac6db081-a855-4ee0-9849-bf98526e9fbd",
      "target": "94f56ccc-2672-4f27-b7f5-2f6aa8c038ab"
    },
    {
      "id": "b08f4aff-86b3-4823-88a4-d2eb68ea18db",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "89ce3789-0428-44da-9823-47897745615c",
      "target": "02fae527-fd37-463c-a7c6-3498a3402403"
    },
    {
      "id": "0d3d2599-cec6-41da-8c88-5a3de88e4f27",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b4fdd1bf-165a-4bec-aa51-e7f010acb11c",
      "target": "46dd3259-91c5-4bbc-aa7a-b6a55275800f"
    },
    {
      "id": "4c8cea86-7578-4c4e-b0d5-8e727092716c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "804da41c-458a-4f87-9f6f-20d66d9291fa",
      "target": "0f8344ba-499a-4d33-abc0-cfc10f4b2050"
    },
    {
      "id": "3be10b45-6393-45e5-8699-24589638af9b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ed758ecd-534d-42aa-82b6-c0baf3a7d8b5",
      "target": "4931c9d0-de29-43e0-ae43-ee88225fe345"
    },
    {
      "id": "cc7b6c63-07c6-4bc9-a718-cc6b1f57b3c9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d2bbc6f3-8c7e-444a-b7c6-31f8a1ac4470",
      "target": "a9f91b09-1a41-4326-aa65-34ec8f13702e"
    },
    {
      "id": "7dd47ac1-b8c4-4442-be5a-4d12f4f03d8a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "12f7c175-2e79-4993-a295-6f187be54475",
      "target": "5e530f23-5852-4aae-b950-0e725c088319"
    },
    {
      "id": "e264f619-d6db-494e-9999-c3b2d8aa00d4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "24fd7dea-fed7-45e1-997f-03f0679b4bdf",
      "target": "a50d2fbf-a9ad-4ad8-97d1-5fe1a2bf7810"
    },
    {
      "id": "2ccb8894-0a74-493d-aca9-9b230faa911f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "883b19e1-8e82-45de-8247-82be991be67e",
      "target": "71616517-5333-4ed1-8e8d-55c182f7dec1"
    },
    {
      "id": "7f4325c2-9810-48eb-9a05-0e0637990940",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6e503e88-d6f0-4db3-a8a3-4ed4e09a631d",
      "target": "dde82b59-3dff-4e7a-9767-94641ebb043e"
    },
    {
      "id": "1eaeda8c-37e4-46d9-9b3f-097af4ad8f61",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bf341a3d-326f-4564-a118-5efe79f53e19",
      "target": "6370de00-5601-4e8d-bb6e-923c5b5fe4c9"
    },
    {
      "id": "bf37d1ef-0975-43ae-aee3-39958643b7db",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ea763d7e-9d52-41c5-971b-9a5bad17cb77",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "b82ff610-b46f-443a-aefa-399ae0316f4d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3a94bcc5-9f4b-4b79-a8c6-28b83d26682d",
      "target": "a2e8a795-b38c-4cdf-8719-c7d7121f9b57"
    },
    {
      "id": "27481c30-0d28-4fde-b200-ca37822c215a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b813296-10bc-4565-8bfc-0ec976a3e43f",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "831ad333-856a-4682-bdbf-caba55cd5d22",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b95813d-47a0-4964-adcf-093772e3097c",
      "target": "593836a7-af6c-4f59-8d53-37bc3612e4d0"
    },
    {
      "id": "f83a05a9-a412-4ff5-9ce8-d18ae854634e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e2e9b126-b4b7-42d4-9788-196b23bb9ceb",
      "target": "02c3fadf-213f-47d4-9ffc-5f7e704d1b4f"
    },
    {
      "id": "8a71e775-c5ea-4b0b-bba8-23b8fec4f9a6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2db067c7-e9e9-45c6-aca6-34844723976b",
      "target": "51d181d5-0b5f-4594-bc9b-e1f9974cc057"
    },
    {
      "id": "8579b3e8-73f3-44c5-a462-e554331c7902",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe67d5dd-86f1-4eaa-9a2b-4091c57b63b5",
      "target": "1ca7cb20-a51b-4f30-8db2-9f1849d5d1d5"
    },
    {
      "id": "f73f41fb-176b-4509-94bd-52586e68e7ce",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9295edce-46ff-43b1-b9be-c6b524629bb3",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "be9f3aae-9759-4054-a97c-41c949f12755",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f538153-0ee0-4510-aaf5-3e7033b34517",
      "target": "7a01b840-8316-46a6-957d-08f4bd3815b7"
    },
    {
      "id": "6a42edf0-fc6f-4523-8211-03b9c2067893",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f435bf13-36a0-46bc-9ea9-593ae30741b5",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "181bae7c-af5b-4937-a720-f4e06576636b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cb10f260-d6b0-4083-8d0c-16c640856a59",
      "target": "a0d87cef-fc02-4288-a214-276426279ffe"
    },
    {
      "id": "d7da3223-9adf-4c8a-a03c-edc2af43505c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f2ddabce-6e2a-4a73-8922-be4d8e93c3a9",
      "target": "c2e2971b-ded0-4907-bae2-080098bce87e"
    },
    {
      "id": "a48cd51d-7f74-446d-a443-e7674d797435",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bbed86e7-d143-44f3-ad00-73ae341ee190",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "c54afd26-2d72-4494-a590-9fff8f00415b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0eebf2c9-72d3-417c-ba40-204090fc975d",
      "target": "106e349b-7453-4eef-bfdf-50970a77876b"
    },
    {
      "id": "bfc56ad3-4489-4efa-8490-8ba49b6ea951",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b7659cba-8d5e-462f-9ab3-347cb749738e",
      "target": "a79106ff-3e11-4b71-8fb7-38b68579228c"
    },
    {
      "id": "89a1a126-531f-4cd3-ae85-53259096ff61",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a90286d-d304-4030-abc7-779ad5a0a4c2",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "679aaa2b-6c85-40ca-a2bb-1ba8cfd2089b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d1e20c19-9cd7-4efe-b477-a80d4189d9ed",
      "target": "bb059018-2fcb-426a-b59a-d518fcb5a199"
    },
    {
      "id": "f68460dd-3382-4bf3-be7a-49629958495c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "07804ef2-5d9a-4de2-8f5a-d86eec1fa9c7",
      "target": "d5d3449e-6007-4970-9301-95e78c83a60c"
    },
    {
      "id": "d4a73747-99c1-404d-8953-d9fb0bfcc220",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "21283757-946f-4825-9677-bfb93188f0ec",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "ad05831d-ea92-40e4-a06e-8ae087cd146e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "87878d02-ce73-4ffb-b70e-ca63580c7f5e",
      "target": "85cbeb0e-69a8-4bec-915c-7e736e0ad6e7"
    },
    {
      "id": "029d19b6-087a-49e4-a85b-cbd970e7e3c4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b1f572eb-a2c4-4f90-87a4-112e5fcb1a0c",
      "target": "0146ed58-7594-45a5-8888-4ef86aecb643"
    },
    {
      "id": "4e631ab9-f7bf-4840-9945-da85add4b2d3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0cecd1f1-0006-4815-8f72-f93c2cba356e",
      "target": "9c2fba52-3119-4dcf-8a16-37d75ecbb24b"
    },
    {
      "id": "e6267ba8-6879-46e5-a2a9-cf3a35e17d7b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "778cb09d-d5cb-4bd5-b647-4f0a277b923e",
      "target": "efd07cf4-286c-4dd1-a7ad-6d52295d181b"
    },
    {
      "id": "d14b5cfa-b986-43a8-9099-8a980489da00",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0c3f88ab-94df-45da-b61d-821639fa58b6",
      "target": "e4e2f884-8f9e-4811-82a5-281654bd3579"
    },
    {
      "id": "a6d6d3d7-4d72-4f90-af9c-e4262e439a4a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cd0ee637-6276-4fb1-8d0e-25fdf752fef8",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "c3318cf3-2083-4dfe-92ac-0970dfc347fc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "92b38b45-2e54-47d5-bbce-f307757fa3a7",
      "target": "168fd96c-100b-4afd-bf84-495a0146d4be"
    },
    {
      "id": "9e3715fd-ad91-4a81-ba10-fb0857d68b11",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8791511c-c6b3-44f4-9f02-1b31e626c368",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "7f012142-db02-4577-83d1-3a574d25d31e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3602f7bc-9a6f-4aed-93bf-d11848d99f77",
      "target": "3efc82eb-0afe-40eb-ba07-0bdd08c2bc16"
    },
    {
      "id": "b22551d4-e381-42f8-b8c3-69914294515b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ee3db34d-60b2-462a-9ef9-5d659fa2fe08",
      "target": "615e3fd7-1d32-4ec3-aa57-57758a40f836"
    },
    {
      "id": "e234c48d-6431-4605-97f8-6c0d406e8537",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b8d045a-9292-47f7-828e-df2fc14df240",
      "target": "044fe15f-c9f7-472b-acea-1eb755a5a887"
    },
    {
      "id": "38b60bb6-b67f-46a4-95bf-7d36860e950b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "edb921da-e644-4301-abe6-96f21c3e4bbe",
      "target": "6878c176-651f-4580-af3b-d8db87f70f3d"
    },
    {
      "id": "184a9ad3-0ad6-46c4-8200-3e1964a813ff",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e22f44ff-036c-4134-8a6f-73bd1fdf0035",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "f52e284c-672b-4342-9056-7c448a1f1b29",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b4fdd1bf-165a-4bec-aa51-e7f010acb11c",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "ff94a6ad-05b4-4652-b46a-d63a6a1e4caa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "915b067a-6a94-4cca-b4a4-8582150a48d6",
      "target": "cf665049-089a-4209-84dd-04d2daa6b39b"
    },
    {
      "id": "830cbd1a-a51d-4629-b832-dcdaf66de3a7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d13f55e3-d1bd-4a34-beaa-d3be48bea4ec",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "8be9302b-32f5-472d-88b9-0a1baa29a219",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d1b77d5d-4980-4977-9643-f7a07aeb56cb",
      "target": "db9a7312-9d77-4daa-9def-2c3bb8bcb7df"
    },
    {
      "id": "ebc0c50d-7d6f-47d0-9edf-5f423239e1ee",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "40e34763-9aa9-48c3-9cc6-892e0a5f4678",
      "target": "4ed0c851-0ff2-49f8-8d65-422270f575ce"
    },
    {
      "id": "588741d6-c20c-4250-b165-276966955093",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5b145c92-d032-4fc6-9241-2136ccf2ada5",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "23102617-da3d-4af3-98d7-0ef5460d2c63",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8bd8ba1-2105-4505-806e-48fb571f5c3e",
      "target": "7a19f1a0-f9c3-44cc-b532-376d9ffb63ec"
    },
    {
      "id": "4dc290f2-9ab6-45eb-b4e9-afacea43f237",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c19273ea-02a2-458d-bc70-684d1f30d4f2",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "9b9dfb56-7c92-4398-8b48-6d5de08cd7b2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dc709f38-22f8-4998-8698-2fac3dfef097",
      "target": "3cf6c5de-fb7a-4272-96c3-b2cdc46a15e2"
    },
    {
      "id": "d39c2d12-6c41-41b4-b63d-2bf2695064ae",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "476a5c9b-48fd-467b-9513-3e21d7cb9049",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "0a0613fd-e0c9-49b4-83ab-05ce256980eb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "13fd2af5-8aac-4a11-8bc9-d3f162fd915d",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "9975f306-ec6f-4208-8934-26f09b7fe43b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7809f78c-59e8-4d30-9496-f7d16b416a3b",
      "target": "13b08a7e-30b1-429e-a705-325902e750b5"
    },
    {
      "id": "0f824df2-4652-4fe4-a042-4d4eb825313c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a0b086af-0b88-45d8-a5ce-cc8eeefd7423",
      "target": "0b80d411-b7a1-4a97-aaa8-6361ad25dc3c"
    },
    {
      "id": "dc4cf5fe-ca42-406a-b507-825da459bb4c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3e27a5ac-efdc-4750-be3f-9d404ea9b31f",
      "target": "06c86ca9-e2e2-4992-8767-6f62816935fe"
    },
    {
      "id": "5c673e7c-a7ea-42e7-9966-c862b56025c4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5ac07153-1805-4142-a9ff-753af0d12264",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "5e3abdde-197e-4c67-9891-12ed2059b0e0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fae0ae6e-0827-4557-ad47-54cd34bb6ad4",
      "target": "24224614-c75b-4ff9-8973-9b28f1a12a0d"
    },
    {
      "id": "8ecf5122-c660-4f75-88f5-05a95e5b7c24",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ce27df86-6faf-4d1f-be9c-d0b109326eb1",
      "target": "cb47759d-5d63-41e2-8d86-00b7f3ade842"
    },
    {
      "id": "bd38312b-2657-40c2-a248-1ecf5504aef4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ce27df86-6faf-4d1f-be9c-d0b109326eb1",
      "target": "b68b9025-b85c-4e7e-b179-bc5ee5186732"
    },
    {
      "id": "79e980ef-5a6e-4213-aa29-e2a03d4a8a93",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3602f7bc-9a6f-4aed-93bf-d11848d99f77",
      "target": "68bf56a0-74b8-44ce-8a47-a74b4689deaa"
    },
    {
      "id": "bbe4988c-6014-4b17-a025-441f7c85a873",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b6dfd0ad-c76e-4d98-9166-4fe62e6094e6",
      "target": "a37e91c7-9083-4b20-a481-96cc3c792a08"
    },
    {
      "id": "ed3a50ef-a5e2-4f22-aee2-e8d2f3960767",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7bafeb7d-7115-448b-ae06-26a596892a94",
      "target": "be74959a-d261-4b06-ac2a-1d92705b27d2"
    },
    {
      "id": "38252c55-12c5-4295-99b0-718ce16b4b78",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1ec8b3e6-b2a2-4845-9a0f-ccf45e4316d2",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "4be8a173-a714-4d42-beb7-b5cae1240763",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8275b113-9006-4695-b890-94b88a84d76c",
      "target": "c1ebdcec-e6e7-4961-8eea-62180d892916"
    },
    {
      "id": "b29ce535-7003-4456-92e5-d046366b88f5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "240cd8e9-51b5-4ecf-85f6-efc55cd9591c",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "401b7d0e-dc92-44a8-a018-2917815acab0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a9871e26-e730-4223-a4df-253910bd00d7",
      "target": "b1b36864-cac5-46a3-bfd5-6b58f33fe1bd"
    },
    {
      "id": "5aca29dd-66f4-4d5c-9284-a49a5e7ea9d7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b5f49582-98cc-405e-989f-37667a7b9ae0",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "57d1aba5-3435-47e3-9523-43bf5b8c2abf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "69fd1220-77b6-4d1b-99cb-76a93e84d0ad",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "9de4f1bd-d659-448c-a15b-5311e1008bfe",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f4bcde0d-96b3-467c-b75b-58c8060a0109",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "bf87c934-bd6d-46cd-b241-0a931595de3d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "00720838-b025-4303-93e6-04fc5cf9a930",
      "target": "35c5421c-e372-40ef-a8dd-6ce5dac897b8"
    },
    {
      "id": "4d5e2d99-2c5a-4433-8edd-cd47eda77ad4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f3d9027-7fd5-492b-9699-4bd54a3673fc",
      "target": "df176b7b-4de4-4475-b4be-10f59cd147e8"
    },
    {
      "id": "406cf43d-7482-40ed-bc4b-5471dea8bd4d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "245efb30-585d-4897-b792-cbe1549fd9bd",
      "target": "2025adcb-2ef2-45ba-b262-ced22fd56936"
    },
    {
      "id": "9eba86d9-9a44-4ea7-95d4-5fc922ebae94",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d7750e37-3c50-4de0-91e1-84a5610522df",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "af8db152-8b81-4768-bdd8-7b9c731a3b18",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5efb9038-676c-49b6-a67e-0f7fde1d7d5b",
      "target": "e0afae04-e13d-4216-a0ee-7d50a16a4e10"
    },
    {
      "id": "5ea3f5a6-fff7-4cf7-a48e-f948eabafbd7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5b8c0ea7-e21d-42d5-bd0f-10ff14aa8334",
      "target": "ff32e377-ad41-4fd5-8644-5600a4603c92"
    },
    {
      "id": "5d52ee90-2687-40d4-8b7d-3a298c60728e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a75966b0-cef0-4fe8-a203-06b0d5f0ff2a",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "dad1a771-4178-470c-8fd0-159ce1d8cb09",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1344ed94-d948-48ab-bb6a-1c29c3e5520e",
      "target": "feabb0a6-8fcf-41fc-884d-e967ecb15185"
    },
    {
      "id": "bf47ec48-f27c-4415-8f4c-216a592c7e0b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a6159f8-3ea1-41ca-bdda-2e909368fc5d",
      "target": "27ddff72-2698-4d9b-bb6a-381f59ec361c"
    },
    {
      "id": "2a1c03ec-455e-4c01-817b-9065447d9361",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9295edce-46ff-43b1-b9be-c6b524629bb3",
      "target": "f2f28542-08df-4582-8fc8-0250d4f18345"
    },
    {
      "id": "dc69b247-bc9d-45c7-9cc6-71c62cf37589",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d4fa8435-1712-49c0-9552-e79a5c59bc5d",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "86c7232f-405b-4a1a-b46f-0e88d47b118a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f091bf9d-b5dc-44d4-acdd-4be427f7bffb",
      "target": "da11af46-c3c9-4c30-b8f3-29c543d16563"
    },
    {
      "id": "042b16b1-644b-420e-bbd8-fe8f162397e8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7eeaa744-11c3-4230-a3e5-ecfa8677b87a",
      "target": "e1d1f0e8-0a15-46a4-a885-409d6fca04a5"
    },
    {
      "id": "203cec5c-777e-42fb-85f6-b36d118fd069",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "af833b4c-4d1a-4d27-8c68-ececb90c954b",
      "target": "6f801393-04ad-406d-8166-68b43c92b514"
    },
    {
      "id": "1fb5e290-5ed8-4a6b-8593-6f488152833f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f3a9db1-c355-443d-b52f-799742a304ff",
      "target": "3dca3006-6dfe-4383-89e3-c93959edeaa0"
    },
    {
      "id": "a2f27f24-e69b-44c3-b338-12040cfb314e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2db067c7-e9e9-45c6-aca6-34844723976b",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "fb21265b-bde9-486b-984e-a31cde723394",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "69fd1220-77b6-4d1b-99cb-76a93e84d0ad",
      "target": "37b0dead-dcaf-4650-b892-a4fc76038e12"
    },
    {
      "id": "3583b7ec-924f-438b-818a-f4a0d315b61a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "489d885a-e548-41da-9c72-b8150c39b2ff",
      "target": "c15578c2-53e7-478f-a71f-a9a797a9a667"
    },
    {
      "id": "a2ba9028-835e-47b2-bbf1-de53fcf256a8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7bafeb7d-7115-448b-ae06-26a596892a94",
      "target": "6cd3e988-6c54-41f4-a2e1-5671581c33a4"
    },
    {
      "id": "4702a71b-8b21-45bf-becd-5eeb6992cbd3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4a7e4811-7c28-4a93-a54b-baca1bc83545",
      "target": "22db41fe-98be-436f-8ccd-b8e0da7c6695"
    },
    {
      "id": "051addb3-c5ee-4164-abc5-5f1e7cac2f6d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f76bfef-886b-46ce-ae0d-e23c2de5f0c8",
      "target": "2a9b56ff-d320-4026-b935-f0b6f061626a"
    },
    {
      "id": "5102e4bd-f041-4157-af2c-f738a8fc46bb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ac74b43e-4221-4756-a790-bd3333d427e2",
      "target": "a11c71d0-5691-4a7a-968b-1b8db0bc306c"
    },
    {
      "id": "bf125e1b-b6f7-4442-8cd1-b65c85fd4961",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cc1d948d-f8e3-4a55-9acb-faba01e5c41d",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "9542200d-99dd-4512-9a7f-67a4c3215046",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f4c5e58-6b09-4798-97f3-c4f495cbf725",
      "target": "51b5a0b8-ac13-4a13-a0e1-def6d1c32fa4"
    },
    {
      "id": "1e7c1cd7-dd39-4394-8262-55f9a2a9d91a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d3a322c4-4104-45ff-a6fc-fb94767c46d3",
      "target": "6f5c6b59-0021-4e20-aee8-83473b355f9f"
    },
    {
      "id": "c8ba2784-fd96-4126-b1b8-bc943519716c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "81e0dd1f-2c0a-4a73-93ac-b7d87d8318d8",
      "target": "25ed3993-a588-43a6-bddf-00379b0fc2fa"
    },
    {
      "id": "5da73f0c-5edd-48d3-8c13-c5a85e3a6de4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6bb462a1-7f17-4252-a78a-8f60e3e4e119",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "70c16c13-f1ee-4099-917f-9a1a9f878cf9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "23c4ac2e-b19e-47e4-855c-06a1c5af033a",
      "target": "593836a7-af6c-4f59-8d53-37bc3612e4d0"
    },
    {
      "id": "a98339bc-226f-4528-bce0-9566fb698dc3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c86156c1-42b6-42b4-a7db-3431e2b648df",
      "target": "7adc3105-0141-4362-a0c5-8ffa922de302"
    },
    {
      "id": "3045426f-7c58-41bf-a228-d8d8c9d6a7f7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d1e20c19-9cd7-4efe-b477-a80d4189d9ed",
      "target": "42acb4cd-d4f6-414a-bf4d-3e100cf6abe2"
    },
    {
      "id": "e1ab27e5-5277-4cfe-9d1f-990ae7f8ab8e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7cc8c318-8106-4a4e-ba77-a7c47ca24ca2",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "3fa51281-27aa-425d-86a7-dcbd819170a4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0f6d15c3-3c3e-4ee4-9e73-997b15341630",
      "target": "b68fa715-f849-45ad-96af-679a5d7dd4b3"
    },
    {
      "id": "ecaca497-0843-4301-ac84-98421d77047e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "12074389-c8ff-46c8-a9da-5b83ff9f5a13",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "ad1326c3-7b38-4657-ae3a-5f8a1a29e00a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1a251845-3762-412c-aa8f-150646cf0522",
      "target": "aecf9e19-6ccf-4ba1-a1dd-6140ed5641e0"
    },
    {
      "id": "d21e75f7-603e-4cdb-b861-17ec361db194",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7ff5d607-4d2f-4ff9-bf65-fc8a7a9fb6d1",
      "target": "5e0864c3-358f-4066-9478-63a9cf43cabc"
    },
    {
      "id": "097c1743-7a0c-460a-9021-dfa846fcdcfe",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "aa9e49d5-3bb2-4135-9d1b-dc4f7fd0e44f",
      "target": "ec5af397-391d-42a5-8984-4ef0891146d7"
    },
    {
      "id": "22c2e5fa-dd24-4936-8cf1-b76b2100036a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2354048b-7f8f-4bf1-b11b-1a022e2cf4c8",
      "target": "08f4f061-0650-4739-8a74-cec7ce312bfd"
    },
    {
      "id": "aefabdc8-6128-497a-b2ef-e599ec4a1ff2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0baaf341-18b3-43ab-9a8e-fc3b47473583",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "8cf542f8-9d6f-4ef6-b578-111ca40c6027",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2db067c7-e9e9-45c6-aca6-34844723976b",
      "target": "5b3b382c-4284-47b0-bc4e-a45b2ccb2fb1"
    },
    {
      "id": "48c1655a-b575-425d-a288-4be2d841c0c6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0e6d336d-2866-4217-95f8-62979f825b36",
      "target": "bb947f97-ed6e-4c16-aac4-7f1e845cbb21"
    },
    {
      "id": "2eda922d-65df-46cf-9b54-593e2ad1195e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7bd352c4-7bb2-4af2-bc38-740c70f3b15b",
      "target": "e4129388-168d-40e1-92c0-8b1b197fe13e"
    },
    {
      "id": "503f924b-9b7d-4762-8220-d642583e68a3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a1ce2387-0537-4187-8df5-210d9e614adc",
      "target": "6f73f564-6877-48ae-b8c2-e278f65f9736"
    },
    {
      "id": "d2e26db5-cd89-4c8a-bdea-641b7bb8a354",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3a0c9340-3aab-448e-80ad-d05f73277fa6",
      "target": "5194c6d4-d879-41af-bd0e-b5df4372331b"
    },
    {
      "id": "9a4b247e-f520-4991-8fba-2f6b035f159a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c62a72e-1761-4e2d-9ae0-cf5bbb816dd6",
      "target": "27e9177c-f7bd-4f73-ad9d-03db97761de6"
    },
    {
      "id": "38718b9d-b115-4a4f-ae1a-817b1ba67c0d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "804da41c-458a-4f87-9f6f-20d66d9291fa",
      "target": "cbe91d7c-fff3-4060-bb6f-11a9a75fe1dc"
    },
    {
      "id": "b774dc24-57aa-4360-85fe-ae13e24fc75f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2c5e1cf7-4bba-47f8-b40d-1063adb3da74",
      "target": "e7412875-6248-4e51-a933-edfdcaa2eb3d"
    },
    {
      "id": "cfa3514d-7e57-43a8-8538-b6283af95c80",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d34f163b-3fdf-4c47-9a94-321d2ec4509b",
      "target": "145867ca-a62d-47dc-9132-1424d287866c"
    },
    {
      "id": "da11f743-88d5-4d7b-9db8-93b621df38fd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "08e649c1-ddca-4c46-9543-6e46616bafbb",
      "target": "18185970-49a1-4415-89ef-a5e7148ec804"
    },
    {
      "id": "a10c7b67-db1a-4c9a-bb37-d5006407cfca",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3b75ffc1-4bda-4889-b011-b3daceddb513",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "1fc278f2-075a-4aaf-8431-dc619c285f3d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd0ef2b2-aa25-4b73-b4bf-bd39d85f692c",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "fb7f354a-c683-4906-9b77-7f87075fc720",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d0cfc2b4-13a5-4a23-acb5-7cf2ff122b9a",
      "target": "95a6f791-b6d9-4002-8173-cf009650dad7"
    },
    {
      "id": "8a798ab8-b302-4a76-aca0-09ddf25a3619",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "486dfe68-5a96-45e4-a77f-e44ae90988d5",
      "target": "2710889a-1660-4480-b2a2-679389bfd50f"
    },
    {
      "id": "b26544b5-1714-42a1-933c-fb7e5a0fba7f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c0b732d7-388c-403d-b520-6858c5903bd4",
      "target": "68bf56a0-74b8-44ce-8a47-a74b4689deaa"
    },
    {
      "id": "77f72add-777c-4770-a515-1a8467716483",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a75966b0-cef0-4fe8-a203-06b0d5f0ff2a",
      "target": "42b0ae2d-6cac-4243-b6e2-37425aa903e9"
    },
    {
      "id": "18a7d4f1-9a12-40a5-ba82-af6f11698756",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1e4b74e6-634a-46ec-9a79-c25f9057d830",
      "target": "a9f6a4ad-d343-496e-b5e1-0d044b970c33"
    },
    {
      "id": "aa13d95c-42fe-453d-894c-cd9aed788f07",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "03a3004d-358e-4d32-aa57-679baa67be02",
      "target": "3dfeff17-33c0-4e19-922c-59f0c42aaf62"
    },
    {
      "id": "2f08c081-c808-4a87-a4f9-1824e035b826",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e35f0c96-7e0f-42d0-b5aa-6a2a89adb9ca",
      "target": "ffee4dc8-3dbc-49f6-9851-0a748e335e9c"
    },
    {
      "id": "633015fb-adfa-45d6-9c16-2a540bb9e28f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e6351e4d-1ee5-47b9-9a06-ef950fc32d09",
      "target": "2eee18fd-54d3-4b91-8fd1-ee4fea36d74e"
    },
    {
      "id": "228ba2e7-8f2f-4c27-b5a6-cbde11242dae",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4235532e-1f90-4222-b799-e50d25194326",
      "target": "5eedd16b-e9e2-4fae-ad36-844a643896a7"
    },
    {
      "id": "4092e66a-7668-4872-9730-d9d716d334a7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c70cee58-e586-420a-94cd-54adf1d8354f",
      "target": "2aa7b476-a577-43a2-87cd-b085b6725503"
    },
    {
      "id": "16e931f2-be79-4c34-bcde-ab85adefbf5e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f677575d-9276-4dc0-bb0c-f716fe1dcea3",
      "target": "68bf56a0-74b8-44ce-8a47-a74b4689deaa"
    },
    {
      "id": "2703df5c-294d-430c-840b-a345d68d253f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d6821f01-a685-40ad-877f-e78c6221feab",
      "target": "546270a5-e187-40ac-916b-20314d6a1fbe"
    },
    {
      "id": "c379b92d-c1c9-422e-a2cf-647605bccda9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0a4e82da-b12f-4262-a6aa-3ae704d5715e",
      "target": "dfb3e544-7b43-498a-b4d0-17c0f565a8b8"
    },
    {
      "id": "6f510924-143a-4610-89a1-33b94f987805",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "33da5625-37e9-4969-9a53-0507ca2d21ba",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "0c7f91d4-0b24-456f-869f-1297e5513bde",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "aa9e49d5-3bb2-4135-9d1b-dc4f7fd0e44f",
      "target": "310009be-6230-459f-a972-fd192f144554"
    },
    {
      "id": "bc923896-230a-4e27-a3fd-8a4c96d76342",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "289f573d-b649-4859-8179-f1589a3852a0",
      "target": "3b93333b-9843-45dc-b279-8750b5aba755"
    },
    {
      "id": "a713fcfb-8d10-4b5d-a6c3-17fccfad8d3a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0fa174b0-5013-4d29-9fff-075ece5c72bf",
      "target": "a106c520-6530-4374-b381-8606c969fb4c"
    },
    {
      "id": "a09d95d2-f158-404e-9e8f-7d6fd3508274",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4f5e5b02-533c-4a9d-bf46-ce78a433b03f",
      "target": "15b53dfd-0e5b-4a16-8879-1a9f3129cb08"
    },
    {
      "id": "222412eb-6f8e-4fdf-b258-671adf94cfff",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b0a2bdfd-f536-4003-aeb8-59af746821a7",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "c3bd053e-15b4-4976-ad86-6d61f005f2d4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b91a01d-dc70-44dd-8fa7-ad70058a9557",
      "target": "02fae527-fd37-463c-a7c6-3498a3402403"
    },
    {
      "id": "dc43ef98-7323-49b5-8332-259f5ca25509",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "adb0c5fa-92c8-45cf-ab55-a6a674c9cb3c",
      "target": "9aac7248-089a-4399-b377-88d938712ad7"
    },
    {
      "id": "50bfd3b4-e465-4fd6-9f1d-c935076dc446",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cd98eb09-8171-467f-b468-72cd062ecca5",
      "target": "ba898cde-d88e-4c7f-bea9-f2eabcca9c47"
    },
    {
      "id": "8936ebae-9dbc-4441-afd8-9ce40d081acd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6768c0d4-60d7-4618-958d-667540dd8ba6",
      "target": "fc67fd7b-1f1e-41ee-b212-1d604438da10"
    },
    {
      "id": "5b2af41e-7414-42f7-9d1b-9b28c7885652",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cc246627-5287-4a90-a205-b33e90f00ac7",
      "target": "8c121e72-809a-4359-bfda-1e6b0d6dbc42"
    },
    {
      "id": "df708b3a-fc10-4947-9c1d-79885e2ef286",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fd5cafaa-6c73-4259-9503-0f348649a3a1",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "ba25e726-524b-4b15-bc3d-89494163d056",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ded40860-e90b-4c78-99fb-394a16fe7663",
      "target": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8"
    },
    {
      "id": "5ffd8ba0-9f32-4a17-8a09-9b42adadb983",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "64e140a8-8c5e-4a62-a735-b314fe7fea6d",
      "target": "07fb1584-2c3d-448f-93fb-d63c2166836c"
    },
    {
      "id": "f34232e4-000f-4577-a7a2-888f404837a2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ed758ecd-534d-42aa-82b6-c0baf3a7d8b5",
      "target": "d7e5893d-e951-4392-afbf-3face5d83cb9"
    },
    {
      "id": "f8291b18-e458-4671-84e6-98ea6ec59be0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d13f55e3-d1bd-4a34-beaa-d3be48bea4ec",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "a2a63fad-bb01-4f0a-8986-eede64074d84",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "45582e96-c54c-40f4-80bf-e929f5b81dbe",
      "target": "5e8977da-39d2-4b7c-b99e-44d84797b860"
    },
    {
      "id": "346efcad-6f99-4e49-b172-52a8191a9040",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "717edc30-6901-47ed-9c4d-bab04cbf360e",
      "target": "d53f31d1-3d35-47f1-829f-2a6326e428c1"
    },
    {
      "id": "c00499c8-9d90-42ca-bede-c69548d9a4f7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "804da41c-458a-4f87-9f6f-20d66d9291fa",
      "target": "48914a82-fa51-4c89-b2ea-c4647a202319"
    },
    {
      "id": "35537011-3ee0-4ac9-9949-f449a3446f04",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "57b7f25b-a7e3-4e83-8f6d-db0717c81f50",
      "target": "4fdfdbbb-cd5f-4c74-87f5-c9b90c916435"
    },
    {
      "id": "30a2306d-d9d4-4040-81df-b2a713cc2630",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7983d8e2-2ec3-4380-94f2-190455d40f02",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "f60a2650-706f-4630-adf1-b069cec2ef01",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3b54eec3-ecd9-4ddd-8ae6-ce99d9cef97e",
      "target": "106e349b-7453-4eef-bfdf-50970a77876b"
    },
    {
      "id": "07227fff-a6cb-4cf7-ad9e-eb5dc6338221",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2622ea66-8866-4b1a-b42c-73de3fad34ae",
      "target": "57093fb7-a551-4e5c-b918-9645c8716327"
    },
    {
      "id": "2c0c4332-0537-4ac4-ba39-51f646bc420c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a9a7112b-c56e-478e-aed7-51200fb9d404",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "ebbe9013-8e6a-48cd-9a1d-534c426617ea",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9a8831d2-813b-4703-ab0b-5948f6b4af46",
      "target": "8d45ca2b-6758-4d50-bf2b-8e0aa96e102e"
    },
    {
      "id": "68915f5e-2ccd-4702-ac7c-28dac337a1d4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0d857b93-4164-43e4-8912-59d1e291f646",
      "target": "2b253c21-2fdf-4b7d-aff7-a787e9a80485"
    },
    {
      "id": "c36fd274-d7fd-426d-a007-e31f7810bf52",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3bf6ca2b-357f-4506-9d56-761b7619ba32",
      "target": "acac8623-7773-456f-ad72-68b818265ca0"
    },
    {
      "id": "bf6498f1-8580-491c-8ac2-205fe624d795",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7baa42e4-a0eb-4ed6-84ec-3fbdbcf73985",
      "target": "9f93b521-442f-4723-91af-693c4abf929a"
    },
    {
      "id": "2fbcf1df-ec52-420a-8c8a-559a1ce2a7d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c86f4057-87f0-4ceb-9789-6cbe191f6a1c",
      "target": "85ce0dea-31a7-49ed-b674-e15ac6fe3b73"
    },
    {
      "id": "eab83456-724b-493a-ab9a-9399d8c4170c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1344ed94-d948-48ab-bb6a-1c29c3e5520e",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "ebf94e56-732a-4f4f-aff3-e5859ad726d3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0605b001-eab3-4cf0-8cb1-05ff21e56ea2",
      "target": "22dec671-f7d4-42ee-b7f3-6a22b27727ce"
    },
    {
      "id": "08047720-be58-4bbc-a103-b9ad2a847ff6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f8eef965-3e1b-4341-b4cb-e074476e96fd",
      "target": "75df8751-561f-421d-b5f3-0cf8c5977fcb"
    },
    {
      "id": "eca7b97b-741f-4d63-849c-b8d44934b5b9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "14c15e25-cfc2-4ebd-a8ba-cb5956a0d721",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "98c1088c-1e2e-447d-85e9-2ace33d2abad",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cd0ee637-6276-4fb1-8d0e-25fdf752fef8",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "c7ac4cf3-6f12-487b-9dd3-7cde321e17ee",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c8fca5cb-4ee1-4495-bce4-2099095d0cb6",
      "target": "1ac8d82e-e246-40f2-ae77-9857c40a1614"
    },
    {
      "id": "eb05ce5e-0519-4055-aa2b-df0a24bd7639",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "296bfb58-780c-477f-9660-1d181192ab64",
      "target": "a64329ed-fbb4-4792-9a63-261f701e2d8c"
    },
    {
      "id": "9db8f78c-68c1-4996-9b78-d5c6cd49af00",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "314aaa1d-c920-4e90-a42b-991bf6bcee91",
      "target": "68bf56a0-74b8-44ce-8a47-a74b4689deaa"
    },
    {
      "id": "417029c3-11cc-4938-876e-ee462e0e0db8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f8eef965-3e1b-4341-b4cb-e074476e96fd",
      "target": "bf3343f9-8e2d-4d7d-9b5d-5b5557da96c2"
    },
    {
      "id": "a2c07b8a-0b1c-42ba-b39f-9dda68723af1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c909d0d7-1b1e-4369-816c-5de352b60e77",
      "target": "6f5c6b59-0021-4e20-aee8-83473b355f9f"
    },
    {
      "id": "5aacc93a-7d5e-428f-8114-afdc3478738d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "17b96d28-b6df-4caa-949e-b7aa467aa436",
      "target": "06eb85c6-e6e9-49f8-beb7-d081a86d3a5a"
    },
    {
      "id": "95d0a1ec-40d5-459b-8279-fd6edb5ecb13",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bf341a3d-326f-4564-a118-5efe79f53e19",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "bd20c103-7f29-4bc7-a1dc-4bed8da3e15d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd0ef2b2-aa25-4b73-b4bf-bd39d85f692c",
      "target": "ac5a0d82-a1d5-4ee4-8d3a-dcf6122531ee"
    },
    {
      "id": "ab1b0910-0dab-4e02-bfe8-fcd8497d7a55",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6c24a656-9cb5-4d4b-9780-513fa1d2b588",
      "target": "a41a7ee5-b7b6-4ffa-b0be-da47632939e6"
    },
    {
      "id": "4f7b93d4-99fd-4743-8dbd-e64caa63f5b8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ba547d6e-af85-4e75-8443-1c5b877a2d5e",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "00cbbbeb-974d-41cc-9b4c-5ab443456389",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "700163f4-7cfb-4bf4-a674-12f992fda1a1",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "f6e84225-9845-4f41-a28c-b93649d2a856",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e00457b2-97ca-4b03-8661-5f8af42d2479",
      "target": "b2eac896-85c5-4c4b-9056-83992c89ccd5"
    },
    {
      "id": "62f4a0cf-5809-43b0-921f-9e931e582b24",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "018e0cc1-7d11-4945-be9f-bac4d0b7e62c",
      "target": "3bff1fa5-caeb-4e67-86ea-eccf20a0e2b8"
    },
    {
      "id": "0fcbd860-dee5-4458-b3b9-e1c4929c2f73",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "635d0a41-d36b-4a03-a9fa-e96da257aec4",
      "target": "c450c06b-eca2-467f-b69d-3ad19b188be6"
    },
    {
      "id": "c7dd5062-9c0e-4eae-96df-6a5775163ebd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "abe0f28a-a27f-42c0-87bc-5ab30820a49a",
      "target": "6f5c6b59-0021-4e20-aee8-83473b355f9f"
    },
    {
      "id": "26d57b0a-3d15-4889-b15c-c257e29b6ac0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "aec03ac9-fc1a-4198-9865-100c59cf4eb3",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "4a0d61bf-8597-49da-9604-053469bf6ef3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e80f4a2e-45bc-45c5-8a7d-24f1f637392a",
      "target": "3b2b1981-f14f-45b7-bb14-c2581133dff5"
    },
    {
      "id": "95be83ff-7675-4678-8baa-1d00d895d1ee",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c95b1106-541f-4ebe-8865-84ed594e3f0c",
      "target": "287fc441-51fb-4294-88a4-3b26597d2cb0"
    },
    {
      "id": "967c3dc8-675e-4c54-a060-67606d07ff41",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "27cf78fb-32c0-49ed-995e-a1e79b0dda91",
      "target": "79e026b6-9e65-4f36-97a4-dce1d3a1d6ae"
    },
    {
      "id": "1a3b6795-b960-46bf-8578-41dd9b6a11dd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ba86f023-20ba-48f7-9a00-d4974d3dfca7",
      "target": "6116094a-c7a1-43c1-b96b-97af4fed968c"
    },
    {
      "id": "7f8c8ab8-79bb-418b-9c1e-125690bc1658",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0f6d15c3-3c3e-4ee4-9e73-997b15341630",
      "target": "8375e973-2090-4db0-a26e-6a0475b46baa"
    },
    {
      "id": "168993fa-611b-4bc6-8cf8-96df5504ed01",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cc246627-5287-4a90-a205-b33e90f00ac7",
      "target": "4ed0c851-0ff2-49f8-8d65-422270f575ce"
    },
    {
      "id": "03ca3ad3-7f12-4d4d-8f8a-42dfcbcc4ea3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b8c4508f-b76e-4fb9-8995-55bd76ac60c0",
      "target": "13cc6387-68c1-4938-a1e0-1cf337a0e9e3"
    },
    {
      "id": "af726205-7ee0-4c71-87c6-1e6f17868d06",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "71340143-aef0-4ebf-8097-11095502fb3b",
      "target": "a79106ff-3e11-4b71-8fb7-38b68579228c"
    },
    {
      "id": "3e152e94-eca4-4f64-85ce-0992246cf958",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "119b1a90-0eeb-45a1-a354-7230019ea377",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "e7a3ff4e-53ff-4ec2-b65c-ad05fb5caf9b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1e4b74e6-634a-46ec-9a79-c25f9057d830",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "beadcdc9-f701-43e3-a732-cb4417c172f0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "255ac304-0cc0-460a-8e88-6f9ba726989c",
      "target": "31fd441a-0dab-48d4-b7d9-e32e98db1e64"
    },
    {
      "id": "6b560b80-3f27-4147-8aff-993f7529e21c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c3fa8315-aa75-4bcc-be83-699d89a62a86",
      "target": "377ebcac-88df-41e9-b275-250b1c0f8be2"
    },
    {
      "id": "62965565-b30e-429b-b789-50008e9c36a9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4b2af559-4907-437b-ac9d-987551e0fbd9",
      "target": "86c7500a-801b-4c43-9a5c-504bc53f13b6"
    },
    {
      "id": "99d32084-c4fa-4525-b067-601ad477f2f2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "100df992-d65d-4997-b64c-950d4c2a489b",
      "target": "48914a82-fa51-4c89-b2ea-c4647a202319"
    },
    {
      "id": "e812ec38-2f3a-4505-a633-d3d6118d69f1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "07abf887-c3cd-43f9-84f7-4899f863abef",
      "target": "f24375d1-fc3a-4d12-9722-4ef00674e913"
    },
    {
      "id": "178f98ba-7705-45a2-b871-1b653dfaa5bf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c656be36-f6a3-463a-83c3-3845f047f8c8",
      "target": "96bcf603-a352-4ea0-8cff-17425a135130"
    },
    {
      "id": "4d6c5731-e858-4f7d-965e-825dc75921ac",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7962b95e-7ff3-4817-91dd-20caa6985a5d",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "e7ab097f-cd88-4a32-8feb-4f76261ee5e6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b3185787-caa5-4676-95ba-46375ca9c632",
      "target": "72b09f8f-45e3-4bea-97cb-6fed78d97b02"
    },
    {
      "id": "b1bb1d1d-a08c-477e-a0bc-929376190b0b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5c1416bc-96e2-430c-9630-0808a1d8cdc3",
      "target": "a1bac567-a747-499b-adc4-6c41c1e16958"
    },
    {
      "id": "2ed676c3-8e58-43f6-b4db-fb999577d464",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7dc155e4-477b-46d5-ad4b-bfb40a120bf1",
      "target": "e6c4e88a-30ba-44cc-90b7-2d3b2323b832"
    },
    {
      "id": "46b24d22-1fda-4dcd-95ff-67c0ed742163",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f246f7bb-6de8-4f7e-a3e1-407e51da7dfe",
      "target": "6999663c-24f0-415c-9481-3306a70e8df5"
    },
    {
      "id": "551e94d7-831c-4783-b17c-2a110e9c5ff1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ea3b1c9c-3065-47b9-a5a9-d6e6cf8f6c89",
      "target": "24224614-c75b-4ff9-8973-9b28f1a12a0d"
    },
    {
      "id": "3337fbee-2991-460a-b1ff-01a5308421e7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "476a5c9b-48fd-467b-9513-3e21d7cb9049",
      "target": "2fd425d1-3e17-430d-944f-ec064beed948"
    },
    {
      "id": "2898a184-ccea-4d97-978d-1cd0db8341df",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c909d0d7-1b1e-4369-816c-5de352b60e77",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "50465398-abec-4066-95b6-02582c93c0b0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fe69a11a-019b-4542-9cd3-ab7c8ea41b1c",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "7c8dd816-e5d4-454f-89b0-281ade76c611",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "16a73c60-6c02-485b-8220-d2898a20bd3e",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "973aa831-51e4-4cd5-a5e1-5a472841bcff",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5d3a28eb-92d4-4aca-9d73-a03cbf511f11",
      "target": "f772bb7c-c389-4471-82eb-061f95e1f99a"
    },
    {
      "id": "4e829ab5-3fbd-4d20-bc09-0c385e0c3631",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8791511c-c6b3-44f4-9f02-1b31e626c368",
      "target": "7db3ea62-a752-472c-97b8-259f361468e2"
    },
    {
      "id": "b3fe57d1-e859-4a9b-a15b-6aef829816ca",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cb10f260-d6b0-4083-8d0c-16c640856a59",
      "target": "a50d2fbf-a9ad-4ad8-97d1-5fe1a2bf7810"
    },
    {
      "id": "80f4299d-9651-4ea0-8856-416942897024",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bbed86e7-d143-44f3-ad00-73ae341ee190",
      "target": "d8c8ca68-5078-4193-9a89-179ed2b4a933"
    },
    {
      "id": "3f729e78-4ad5-4ae1-b660-35d034474182",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b95813d-47a0-4964-adcf-093772e3097c",
      "target": "267903d7-1323-483d-baf8-d49acfc02d0c"
    },
    {
      "id": "f0783efc-f162-4417-a58b-9e1719c5dfc1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b81f9ab5-ffe4-400e-9a7b-e5afc612ecc9",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "f54f9306-7962-4c58-af3f-a8810de83efc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "96197637-2c00-4c9a-bbaa-56f278458c45",
      "target": "fc67fd7b-1f1e-41ee-b212-1d604438da10"
    },
    {
      "id": "0919de55-f905-48e9-ba2f-a04380a07877",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cc246627-5287-4a90-a205-b33e90f00ac7",
      "target": "0da7b685-2b55-44ad-b7b1-081acccd9752"
    },
    {
      "id": "9febf334-23a0-4f5e-b7b4-edfdec2d6d35",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8b17424b-eeff-4098-b8f7-7dfb58a681da",
      "target": "61b74829-303c-4cf7-9782-b93ba985b56d"
    },
    {
      "id": "fe878d99-4df7-4dd3-9791-dd7cd608dafe",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3a94bcc5-9f4b-4b79-a8c6-28b83d26682d",
      "target": "6f801393-04ad-406d-8166-68b43c92b514"
    },
    {
      "id": "b2e561c6-689c-4e41-9429-a18063f12d70",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b26dc4d7-ee4c-4651-b555-25abd4fbce42",
      "target": "8e3fbc5f-14dd-4bda-be19-2352e400534b"
    },
    {
      "id": "da0fedb8-f9c5-4ff4-95f7-9caf3101cb62",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6bb462a1-7f17-4252-a78a-8f60e3e4e119",
      "target": "a1bac567-a747-499b-adc4-6c41c1e16958"
    },
    {
      "id": "4166467f-c4b1-4585-a1f6-c6ccabfa1299",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5629ee41-b18a-4398-b1eb-5fd86265609c",
      "target": "32046e21-86dc-44c9-b654-ff699e6ba005"
    },
    {
      "id": "a16a4441-9e9f-4edc-8a36-8b0c67e49264",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4b9e81fe-c14f-4fac-99cd-025ac79bc6fe",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "cc6327c5-64bd-4e72-ba18-4ff1e6e44919",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8d12c06c-d905-4bd5-882d-f1080c630e66",
      "target": "6a92d323-ef92-4164-a40b-4b0f370cf88f"
    },
    {
      "id": "bbd98e0c-a803-4df3-b8ce-ab83dd5a9f48",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0d92deb9-9942-46fd-9204-a3658ef998f1",
      "target": "b39a6c5e-a72b-4edb-b009-d1255d402d0c"
    },
    {
      "id": "b73d3e7b-7860-4b2c-8244-863782058eb9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1e442c0f-d45f-491d-abaa-74c6c70203e1",
      "target": "07d7bb28-6c45-4ac3-9043-624c151a4632"
    },
    {
      "id": "995f0016-c6b3-45c3-8f4b-e838d6648933",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c656be36-f6a3-463a-83c3-3845f047f8c8",
      "target": "37b3f23e-9315-4783-b0fb-52136440e421"
    },
    {
      "id": "49a347b4-452f-4108-97d5-a27b913bdba7",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9328691d-5b23-4133-b6f6-d7bd136b121c",
      "target": "6efcb4b3-d1b4-4013-b104-6eff9662bdf8"
    },
    {
      "id": "7d03c514-8c6a-40b0-8fff-262714b4a470",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2354048b-7f8f-4bf1-b11b-1a022e2cf4c8",
      "target": "0dde9f21-3c32-42d5-9f9e-b61b6fa6336f"
    },
    {
      "id": "f239202f-5a42-4e70-9d8f-5684b5006816",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8c8611ab-3cdb-476a-bbbf-56213fe68e60",
      "target": "0d52054e-772e-407b-b9da-2bcb7db06d90"
    },
    {
      "id": "c33d7f6b-5081-41e9-abb6-69bfa54bcfc3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b6dfd0ad-c76e-4d98-9166-4fe62e6094e6",
      "target": "4b65f341-97c3-4777-aa70-05c5a42fcd5a"
    },
    {
      "id": "8c412525-0a5b-4d26-8890-a8f5c1235569",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "28817efc-f79b-407c-a95f-6f158f40a896",
      "target": "3bbdd7e6-f179-4975-a905-6e7f4b672e07"
    },
    {
      "id": "a21b5777-b9bc-4cd1-8a47-b20ed09722ab",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9488e791-1fc4-4f54-824d-61465a0dbbf6",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "1649d9d2-2810-4e47-9d14-84d36f2334b8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7e639f23-ee68-4e89-a7b7-fd0db884f513",
      "target": "349fcb31-4471-4c0b-b20e-45b2cf4748fc"
    },
    {
      "id": "d961c2ff-cdc4-49e6-8ee2-871d4d63d24c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "725dbd08-45c9-4cd8-bc80-e1a9d736f4f3",
      "target": "a0cd6d85-08c7-4a60-9345-b218a95fb9db"
    },
    {
      "id": "f6c2e676-90c6-4f02-8f22-6d7ec5f63a1f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "9d3429c7-5209-44a6-924a-5e413cba729d",
      "target": "9b4b6115-46dc-4aa2-afd8-a478d35637c3"
    },
    {
      "id": "912a5a96-386e-47ba-bb53-98894fa31656",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b91a01d-dc70-44dd-8fa7-ad70058a9557",
      "target": "84ecfde3-5f13-4069-8b89-29c6f293ae1b"
    },
    {
      "id": "60d168dd-e73d-4e79-9f4d-788ec9b8d292",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "63371595-93f3-42c2-aee8-2a487612d88e",
      "target": "6065769c-9eb1-4e9f-a392-a76bfa811563"
    },
    {
      "id": "d1b686ef-9ae7-48b8-b219-b4dd9f7000fc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a2beb18f-7f64-42a7-9bfd-06e9e60869f6",
      "target": "4e82149a-c359-4e29-9e87-3cb18e8d4a96"
    },
    {
      "id": "5e6e5279-c27b-48a0-8997-b02e4c6cfaab",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d02ae7c4-3851-4453-aece-8594b1604cca",
      "target": "097c4014-6172-4416-b937-1fca06412828"
    },
    {
      "id": "97513994-d5fe-4d82-859c-a0ad6c653219",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bf924006-8ce7-4f92-9d85-fb1857ff4762",
      "target": "2aa8089e-8e1d-42c2-9be0-cc64bfc15b0f"
    },
    {
      "id": "877a1f4c-e6fe-449e-bf83-4f5d86c2cede",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "f246f7bb-6de8-4f7e-a3e1-407e51da7dfe",
      "target": "c7b732bc-58bb-4cf4-87d2-3ea73504137b"
    },
    {
      "id": "b691ce73-0bb3-46c4-b403-b1c5c4bc25bb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "12074389-c8ff-46c8-a9da-5b83ff9f5a13",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "0aef2dcd-d017-45df-a5a5-4c447623b8d4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "66bb42f0-8248-4af1-ada2-9201740209e4",
      "target": "2bb1f4dc-803d-42a0-8909-d0c61b87e2d2"
    },
    {
      "id": "4a03f320-8263-4199-b9d9-8e99b09a21c5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "48b557b5-2939-40d2-872f-e08597c57224",
      "target": "9b0de91a-8766-437d-a72f-a06e2d88853c"
    },
    {
      "id": "8ef6739a-8e71-4642-871c-2501e606e0a0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dd30e3d8-081f-4d41-a170-127df79da289",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "6cb92cfa-2a1f-4e64-b377-fc9e0b389833",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "27cf78fb-32c0-49ed-995e-a1e79b0dda91",
      "target": "b3798caf-a0d5-4187-9239-2cc104ac3c0b"
    },
    {
      "id": "c3c9f56d-d235-4371-9f69-aca04f54702e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "119b1a90-0eeb-45a1-a354-7230019ea377",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "b09c26e5-631d-431c-887d-e1d465f4e21e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8a6532e8-dfab-461c-8b7c-ac532dae194e",
      "target": "06d45aa4-40e3-4ae1-9a57-24ce48ff05ad"
    },
    {
      "id": "1adbc0e3-6f50-41c8-83c9-76c89aaedab0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b7c687cc-c102-4c09-80d1-717a29244053",
      "target": "baa0c5c2-9de2-49da-b58f-d0274a48ab60"
    },
    {
      "id": "4f4691d4-d129-4e4a-8f51-d95351722662",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1bf59584-2fda-4687-9626-144d4c9a37a8",
      "target": "12aa6338-1a46-4aa0-9329-0bc456f5b431"
    },
    {
      "id": "5bdee0f3-5bc4-4221-88ce-d4e660b352a1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f4774af-fcc1-4fd3-9dc6-58511e7d0d35",
      "target": "615e3fd7-1d32-4ec3-aa57-57758a40f836"
    },
    {
      "id": "d79814d4-f3c2-483e-9ba6-dbde3814af55",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "80010e00-e158-4d86-9c1d-477d3897c0c9",
      "target": "eff071c8-df8b-4d5b-a247-6932fe0ce410"
    },
    {
      "id": "4ddc6612-6725-42b3-a0c1-de1e0215be70",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fae0ae6e-0827-4557-ad47-54cd34bb6ad4",
      "target": "7b986f6d-0c87-4208-9e22-dc840e493f63"
    },
    {
      "id": "8a36c808-d370-4e27-a92d-5aa7841c61a9",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "90a57e9a-23c0-4c92-84ce-efdec4d66868",
      "target": "684ca449-676e-4369-8705-d7b601742f4f"
    },
    {
      "id": "4f3b7cf9-c3fa-4e23-b250-4566d689dadf",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "af833b4c-4d1a-4d27-8c68-ececb90c954b",
      "target": "504abb72-be84-436a-85b4-c8e5d893972b"
    },
    {
      "id": "37dc4df2-3aa5-4bbd-8c8e-62a3db04773c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "684474de-f7f4-4ed3-9d32-dc046745be98",
      "target": "aec19484-ed34-428a-8e41-6db55cb185af"
    },
    {
      "id": "79e36cc4-08d9-4d39-92ce-33d6a21e4054",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "03a3004d-358e-4d32-aa57-679baa67be02",
      "target": "6a55b0c7-60d3-4133-ac9b-a65ffbd21b82"
    },
    {
      "id": "223e86aa-6977-42ed-b24b-5a6f24a2a820",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "42ad8250-8d9e-4345-9314-dffb5f15c396",
      "target": "c6922f5d-8375-4c4a-8560-5e47f79300f0"
    },
    {
      "id": "08f060c3-263d-43e9-8c28-13db0fa1566b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "29944e63-5676-473d-8d43-7bf16ccf6d65",
      "target": "75ee7453-b691-429b-878c-2994f8c1630f"
    },
    {
      "id": "d607736d-8da9-4fb2-8ed7-a8617dd00fad",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "733cdc8c-1040-452d-953b-50afb77d896f",
      "target": "d16a8bdb-da4c-484f-91f4-d73d74cb6ad8"
    },
    {
      "id": "26f459e0-49f6-4c78-a540-8da64f5f0849",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0fa174b0-5013-4d29-9fff-075ece5c72bf",
      "target": "75df8751-561f-421d-b5f3-0cf8c5977fcb"
    },
    {
      "id": "0a1b0667-92f1-4c2a-aad3-d08ec34ed257",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "018e0cc1-7d11-4945-be9f-bac4d0b7e62c",
      "target": "c434fb5c-844d-4e75-8ec5-12ad13d1d88f"
    },
    {
      "id": "f3021aa3-444b-474a-a5a1-6d0241e491f0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "122a0e2f-cb41-4c30-808e-820e3594e71c",
      "target": "7db3ea62-a752-472c-97b8-259f361468e2"
    },
    {
      "id": "c305461c-5f20-4afa-807e-baef57569c29",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d522c613-39bc-48c5-8b27-3353de85dd89",
      "target": "157df80d-e98d-4e06-a2ca-2edc78dc01d8"
    },
    {
      "id": "73541d96-51d0-474b-9a95-9c389f58fd8b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b7c687cc-c102-4c09-80d1-717a29244053",
      "target": "77867a7f-af5f-4c6e-be38-f49c9ac0acdf"
    },
    {
      "id": "7a96eea2-3818-4dd9-a97d-aa8abfd04f88",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "79bf9be2-ade2-471f-bc24-d6c7982aee81",
      "target": "fd39d89f-e759-43a7-831e-8d28c4010746"
    },
    {
      "id": "9128bf45-5b91-425e-9135-cee4378139a5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "297c9aca-665d-44ae-b444-47c6dbb3d7d9",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "eacd3765-0b2f-4988-aae6-cc2f4e983a9a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e1b8a148-5b29-455a-8818-bb32214df335",
      "target": "f19ad04c-150b-4e94-804b-90c30c3d73ec"
    },
    {
      "id": "700e9e8c-fd46-49b5-a55d-955b77bff5f6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7e639f23-ee68-4e89-a7b7-fd0db884f513",
      "target": "310af81d-79e5-43d7-9db8-7bf2a31fa985"
    },
    {
      "id": "b924469d-b4ab-4e05-aa21-fceef584bafe",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b813296-10bc-4565-8bfc-0ec976a3e43f",
      "target": "f188d001-9397-4bda-bb9a-f649f45dd4c0"
    },
    {
      "id": "941af469-4d23-4cc6-a351-bf06ca9c3048",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "40e34763-9aa9-48c3-9cc6-892e0a5f4678",
      "target": "e0833ee2-6e76-4fc5-aea2-0b8ab2d3df78"
    },
    {
      "id": "be53f3cb-8a22-4025-9697-f62e57055bc0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a0b086af-0b88-45d8-a5ce-cc8eeefd7423",
      "target": "b2eac896-85c5-4c4b-9056-83992c89ccd5"
    },
    {
      "id": "4f3e6980-ee53-4c9f-bc03-0e9b250ed368",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1e442c0f-d45f-491d-abaa-74c6c70203e1",
      "target": "48914a82-fa51-4c89-b2ea-c4647a202319"
    },
    {
      "id": "c40d9b8e-dcfe-47ea-b835-32345a903ad6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "257b19d9-168a-4e95-acf8-693dfe6980cb",
      "target": "4fd4a866-def8-454f-a1ee-3ac9af54f361"
    },
    {
      "id": "89c17e43-9657-44ae-a2c8-8a433c007b51",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "df3dd182-4c18-42a0-b812-1e6e13c5dc9e",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "f4bce113-7709-4cae-8a52-f6307700e1e8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "babe938e-30d3-4229-8f79-07e4b9d046d7",
      "target": "adbe3e5c-5fe9-460b-b3c7-fa02dccd525d"
    },
    {
      "id": "e3062181-cc7e-42bb-a716-d3b557eff04f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6d6cf97f-17b2-4f74-a184-59e4c5efe56f",
      "target": "88890e75-8051-4f8d-b865-650bf3ddcfee"
    },
    {
      "id": "1fe1362f-a2ba-454e-9d54-69ecf0ac4a78",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7962b95e-7ff3-4817-91dd-20caa6985a5d",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "4215b3c8-e228-4e12-95f2-242818ac4785",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5912d4cc-80de-4fa8-aa4c-ba0513bf409f",
      "target": "715ecf13-bab8-4db9-baac-977e05948622"
    },
    {
      "id": "132b11a1-2f9e-4c8b-8454-2475635e12d2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e749af9a-e3bb-411e-a2d7-73593b9539da",
      "target": "0cf6ca94-0881-4525-bb94-b270c6dff262"
    },
    {
      "id": "8e5c188c-dabf-4e35-bccd-713a9d975e14",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b74bbdb6-20ae-4afb-9921-1d791201d62a",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "1bb31176-84c4-406a-85dd-b6084352fd59",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "1c0c3120-679c-4f69-9f8f-c5133083c49f",
      "target": "081b3241-848a-47cf-9928-7b93add9b95b"
    },
    {
      "id": "8e4ed10c-1d91-40c6-9ce0-51b3ca44d3da",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5251adc1-caa8-44ac-9f98-3e03f0b5090e",
      "target": "a8944eaf-1332-42ff-b295-52276c71439a"
    },
    {
      "id": "fd6d6faf-a561-455f-8927-37a118a059d2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "19e283f2-054e-424e-a43d-5719a12b3c0b",
      "target": "df21d120-f6c7-4155-887d-7f6b8ce2288a"
    },
    {
      "id": "ec2b21ca-fc63-4e04-b2fb-2c5e89acd6f3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0e6f4b56-a4c8-4418-8953-6b0be0e2d23d",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "1bdb0c95-2f48-4cab-8587-f2237d21483b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3afa66b2-48e5-4c62-8f54-455d27c92e95",
      "target": "9b0de91a-8766-437d-a72f-a06e2d88853c"
    },
    {
      "id": "5dfcfa90-ea73-40c3-bb75-253b25faa52e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f76bfef-886b-46ce-ae0d-e23c2de5f0c8",
      "target": "cfbdb5ea-749d-460d-9a98-cab0381296b3"
    },
    {
      "id": "f208a65c-3110-4338-b9fd-1b484eefe5ef",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dcde9256-1808-4a5f-b8ba-23145edec619",
      "target": "d7cfb938-0b60-4d4f-aa42-e29226ed3fbf"
    },
    {
      "id": "a361c199-b2f5-4482-aef3-ba4c563b61f0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "fd5cafaa-6c73-4259-9503-0f348649a3a1",
      "target": "18185970-49a1-4415-89ef-a5e7148ec804"
    },
    {
      "id": "c91e9ed2-4d52-4cb1-a83a-b4b8afa9d3a6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0f6d15c3-3c3e-4ee4-9e73-997b15341630",
      "target": "fa91de5b-025a-45c5-8e88-b0c469f8ae76"
    },
    {
      "id": "4965f467-0c5a-4499-902b-9e3644b79668",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e80f4a2e-45bc-45c5-8a7d-24f1f637392a",
      "target": "e641b6d6-d4a3-48c4-b20c-076f4fe3950a"
    },
    {
      "id": "6d1e6ba4-6d18-49f2-9fe5-f76a97960c31",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a71e95f0-f2ba-45c7-99e5-dc6992fec770",
      "target": "615e3fd7-1d32-4ec3-aa57-57758a40f836"
    },
    {
      "id": "d00456bb-d457-4c01-8bf1-f14c2167f627",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "456c7aac-a41a-4616-91b7-3aff7e51c3b6",
      "target": "bba108aa-b856-41d9-9677-e41d2e9bd54c"
    },
    {
      "id": "7865e1cf-d930-4398-ae3e-34d9e9920129",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "babe938e-30d3-4229-8f79-07e4b9d046d7",
      "target": "af604d41-dae0-4bcf-af0a-462be0435848"
    },
    {
      "id": "18d907a7-da6f-4173-b2b0-bf3344975ac8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8f4c5e58-6b09-4798-97f3-c4f495cbf725",
      "target": "23996d2b-0818-40f4-9ce3-a12030be4e8b"
    },
    {
      "id": "ef51e9e3-2ad7-4f54-a1a9-7e849fede637",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2309158e-ffc0-4a41-984e-35eefdc54be5",
      "target": "4a943b9c-d113-4aa8-969f-9bd2173b4544"
    },
    {
      "id": "66c0e94e-6d13-4f84-afc0-6e779c532611",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "02381b5c-99e2-4114-884d-d72612a2cb57",
      "target": "99c05d67-336d-4a26-bd7d-41a2d2354474"
    },
    {
      "id": "fe06531e-f077-48ba-91e6-82757412c6f1",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "dcb7ba91-784b-409a-bc4f-682f974ce1df",
      "target": "2c7fe19a-cf14-4dae-8172-9cb579909848"
    },
    {
      "id": "1a0d99d2-f21c-48d2-8bed-0413003d877f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7d9d50fa-740e-41bf-ab37-b961edde7ac4",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "2b9794d7-73fe-466d-b18a-1833b7aea8aa",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2ed0b4c6-2158-4b3e-a5c6-e04bccbf6584",
      "target": "a0cd6d85-08c7-4a60-9345-b218a95fb9db"
    },
    {
      "id": "9a245c20-40b9-466a-b5c4-6a98f4fdf7ec",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e4f8bf1f-9c47-480c-b518-2cfbebc9abf5",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "f8aa86f1-0c58-4e9c-a040-36990dcbe635",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "45582e96-c54c-40f4-80bf-e929f5b81dbe",
      "target": "2c7fe19a-cf14-4dae-8172-9cb579909848"
    },
    {
      "id": "937064b0-4811-487b-a9be-c1f823cb68ce",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e27e4081-256e-439a-b4d4-2b59485f31e1",
      "target": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711"
    },
    {
      "id": "37396298-c7f9-4ca0-a970-4c8b628b511b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "95a837a9-ac33-4fda-95f0-21f0d7636d85",
      "target": "f28c169b-45da-43f7-90f4-798b0bf3d419"
    },
    {
      "id": "30701961-7c9f-478c-b766-bfb13c8eb42a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "bfdf1c35-7ef6-4863-9ce2-7c446c7c50b0",
      "target": "968bc5c4-ed19-4657-a9a2-e20cfbb645be"
    },
    {
      "id": "da530b6c-8d37-4273-bd7e-b5bfd7de6b9f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0a4e82da-b12f-4262-a6aa-3ae704d5715e",
      "target": "53b454ae-4bc2-47f8-aa53-5fc0566011d9"
    },
    {
      "id": "1f1eeeae-d787-4b2b-a80a-4c5643033b8f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2a9cbcb8-6008-46f6-9712-cb5246a356de",
      "target": "e5616e79-e606-4617-ab83-688a4a1694dc"
    },
    {
      "id": "a3b20837-ba3b-43c0-a7ae-ec68ea39094b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a1ce2387-0537-4187-8df5-210d9e614adc",
      "target": "0b59666d-00e6-4aba-aca4-deb8e6b94e2d"
    },
    {
      "id": "3c2e7884-bd85-49af-bc63-ba9ba7c4e032",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6b8d045a-9292-47f7-828e-df2fc14df240",
      "target": "5ffc3a26-c321-4ad7-94a8-67984ee231f0"
    },
    {
      "id": "13f97aad-47a5-422c-bd53-d42a534f04d8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4b9e81fe-c14f-4fac-99cd-025ac79bc6fe",
      "target": "c08ae974-5452-490e-9ac6-97a5fcd4bb91"
    },
    {
      "id": "caa925bb-63d2-4830-9c3b-70fce960418f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e4ff2adf-2fa9-4ad4-8953-d551bb3c5d62",
      "target": "8774b975-8813-4fe5-9f14-1131e04c9e58"
    },
    {
      "id": "7c59706a-784f-4e8b-916e-67a85e420579",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0df3ec7c-59f2-4efc-8e85-8005382cb248",
      "target": "3d8ba45e-46e8-46fa-8a1f-82c2cc7b95cf"
    },
    {
      "id": "ed66bb41-be73-4fdd-a4c7-66b7c3cb2375",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e2e9b126-b4b7-42d4-9788-196b23bb9ceb",
      "target": "754133ee-4dc2-44e1-9028-d6048f6fafde"
    },
    {
      "id": "c3c422b0-acdc-4306-9c55-ca7373d97030",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8622747d-791f-4362-bbfa-0f26e2154ebc",
      "target": "ba580911-6aa0-4243-9c67-cfeff460e75f"
    },
    {
      "id": "de5e781f-d2ab-4897-8360-d035f432a93b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8d989794-ac65-4d8e-bf23-8b573ed562e4",
      "target": "feabb0a6-8fcf-41fc-884d-e967ecb15185"
    },
    {
      "id": "71e094be-3d0c-4fe9-822f-cb3284c4ad3d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0ac3a52a-b636-486d-b873-19585027154d",
      "target": "0d52a4d8-470d-4a77-bc80-970f64e1f3c1"
    },
    {
      "id": "8e32964b-8d0c-43aa-8ff6-d08b817e285c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "08e649c1-ddca-4c46-9543-6e46616bafbb",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "406d9d3f-1322-49af-9b08-95dd8be182d3",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8111f4b1-3051-4b85-82d5-00126dc133da",
      "target": "9769c33a-7f64-4add-81be-de927359e24e"
    },
    {
      "id": "93f80110-ed12-44ed-bda1-0c78805fd1ce",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3b75ffc1-4bda-4889-b011-b3daceddb513",
      "target": "b56af550-6226-455b-9651-70dae0213f23"
    },
    {
      "id": "b5e7ac42-7d2e-4e49-8280-24575ced6235",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "b3185787-caa5-4676-95ba-46375ca9c632",
      "target": "64c7d764-e5cb-4cfc-864a-02d5b5b9533f"
    },
    {
      "id": "0a237ea4-6f27-4dd7-94e9-a6c834bc6157",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e86ba7f-ea5a-4a1e-bcc3-c2587e04889f",
      "target": "b51ead58-2a71-49b3-bff8-474d8a433811"
    },
    {
      "id": "3764f247-ec09-4cff-8c50-6137fa3389b0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4e13fb8f-e809-43e9-9917-acb0c224bfb6",
      "target": "d171efb6-90a2-4188-8afa-8cd98736269f"
    },
    {
      "id": "68c918ac-7a2d-40e7-8627-ee7a99f8eb4c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5efb9038-676c-49b6-a67e-0f7fde1d7d5b",
      "target": "07770759-0f2e-4336-a211-b4f55baa1054"
    },
    {
      "id": "26aaebf6-9b5c-4c35-a799-bd536620266c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "073eecc9-57e0-4260-a364-bb3a6f1d4269",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "fc18dc1e-6b21-4c70-945a-8f2b3a88fcb8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a0e9da64-385d-42f1-820f-c5b485a392d2",
      "target": "8c224b7c-1b2f-470c-b0e0-ecb51e90b711"
    },
    {
      "id": "45ad0194-50fd-46ff-88c3-877104e01dde",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0e6f4b56-a4c8-4418-8953-6b0be0e2d23d",
      "target": "615e3fd7-1d32-4ec3-aa57-57758a40f836"
    },
    {
      "id": "c7c1df4c-3d9c-4fc7-a537-7adaa7e55304",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8622747d-791f-4362-bbfa-0f26e2154ebc",
      "target": "6f5c6d92-1f4f-4df6-bda7-e878e17029f2"
    },
    {
      "id": "a42e6155-4421-4061-9f72-06a695b50562",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "a54e3c2a-8a65-469a-9f98-3a6b17a8baab",
      "target": "7b910deb-221c-4577-92ef-145db9eb741a"
    },
    {
      "id": "f047034f-227f-4be8-b613-268220f10d87",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "aec03ac9-fc1a-4198-9865-100c59cf4eb3",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "99d5a19d-0f15-4d1b-a6f9-f34c8fa82bb2",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ffc24834-8795-413c-8279-f9ad7ac19902",
      "target": "da11af46-c3c9-4c30-b8f3-29c543d16563"
    },
    {
      "id": "b528f4d8-2256-4fd7-9ff4-a9c8ce537ceb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "56c86f6d-3137-4960-b19d-1cd8e12e8030",
      "target": "051707b9-0d35-400c-87d3-e8533903fe02"
    },
    {
      "id": "42478d98-3304-493c-a03c-366ce02694d0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e02cca10-c1d2-47fe-aa61-ae6e7cec1ef9",
      "target": "615e3fd7-1d32-4ec3-aa57-57758a40f836"
    },
    {
      "id": "1dc4f5a8-405b-4084-b76c-93b93fc8162c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "40301944-5e3f-40fc-9345-e51e36153f4e",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    },
    {
      "id": "12c90b42-a3b5-4dd3-83fd-fc41d56ffdff",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "28b0413c-2f34-41b3-863f-468642ff1ef4",
      "target": "96fc8261-849c-4709-8b35-7bf6be77caf6"
    },
    {
      "id": "e7bd826c-e4c2-407e-a8b5-3004496c541f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "476a5c9b-48fd-467b-9513-3e21d7cb9049",
      "target": "2025adcb-2ef2-45ba-b262-ced22fd56936"
    },
    {
      "id": "6c7c273a-45e6-42e5-8319-8ccc4742d26b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8b17424b-eeff-4098-b8f7-7dfb58a681da",
      "target": "6782e93a-fb7a-4f44-a323-a1ed4d5f65ed"
    },
    {
      "id": "1702ae8b-e0a2-468f-8313-5475d60cfedc",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "07abf887-c3cd-43f9-84f7-4899f863abef",
      "target": "8296ed3b-4e8b-41fa-a38e-ff97c6748930"
    },
    {
      "id": "9ab48722-5ddb-4b85-9b5f-55bb98419d23",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "96c707a1-8786-4251-8f2f-bd9521479388",
      "target": "9d2e9acf-abfe-4bec-ae74-11540bc4f253"
    },
    {
      "id": "abbbfce5-2e22-4f41-bdbe-baeb344ba104",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "50e8a9df-ae86-4349-8155-acfd0ee32e6c",
      "target": "9fbbaa54-3354-4d8b-9fa1-cfc6f4390b25"
    },
    {
      "id": "205b4c9e-29b0-44e0-9062-be91da76b486",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d0cfc2b4-13a5-4a23-acb5-7cf2ff122b9a",
      "target": "f514ee14-2820-433d-ad28-025bc10d471a"
    },
    {
      "id": "41e26a4b-b7f7-488c-b48c-2cc701606696",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6bb462a1-7f17-4252-a78a-8f60e3e4e119",
      "target": "85ce0dea-31a7-49ed-b674-e15ac6fe3b73"
    },
    {
      "id": "014ce1b8-cdc4-4f67-887c-b47ae8884cac",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "4ce47ed5-c01b-4930-a91b-ed2688adce7b",
      "target": "b930f90a-c554-41b7-ac7b-933558e21b9c"
    },
    {
      "id": "bd2d1ae8-2b6d-4dbb-94ad-df21feca7f5f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "21d3c45e-1492-4649-8a5c-a4f621f776e9",
      "target": "5c31659d-e00d-4f36-a7d3-c7f8f50ff59f"
    },
    {
      "id": "59f97bd3-46e2-40ca-aa0b-5de23fa8a89e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "be716aa4-fad4-498e-9ac8-8a0c03706222",
      "target": "aabcc322-e24a-4c0b-9dc7-397ceb05a63c"
    },
    {
      "id": "6daf5598-0465-4658-a019-58f2d48fb680",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "0989c9c6-9a04-4df4-b20c-a65af39af17e",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "57f3b2f7-5318-4131-a330-fe820f2ad8bb",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e749af9a-e3bb-411e-a2d7-73593b9539da",
      "target": "049e2c60-6640-48f8-8e85-d7b7d5861b2f"
    },
    {
      "id": "f4935d5a-8c46-42be-be24-cd48bd9eb67c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "23669237-8c9a-42dc-a58a-bcf3a6554ce9",
      "target": "9c2fba52-3119-4dcf-8a16-37d75ecbb24b"
    },
    {
      "id": "cb13d67b-e501-4a03-b9c7-d625e9716f4c",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "18503d5f-039e-4f1a-a3e3-230f53eb643a",
      "target": "8280c6dd-49e6-4e59-8b46-a4e771f6f6ec"
    },
    {
      "id": "71accf5f-6c61-4fd1-8b16-40db62bf6278",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d0cfc2b4-13a5-4a23-acb5-7cf2ff122b9a",
      "target": "82c9abc2-e952-4e08-bdb8-32126d7755ca"
    },
    {
      "id": "62b92d7f-5d09-474e-ad3e-ae51c49a2000",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8298c861-30f5-40ab-823e-c028301a6402",
      "target": "07571d72-0c66-43dd-93cb-2ef4bceb4a4c"
    },
    {
      "id": "5f5e850b-d80f-4720-bd99-bbd2782f75c5",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6e503e88-d6f0-4db3-a8a3-4ed4e09a631d",
      "target": "c5226217-a767-4196-9325-211d20b82217"
    },
    {
      "id": "f8cc3d1d-ed65-4163-a797-422f729e81b6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2a9cbcb8-6008-46f6-9712-cb5246a356de",
      "target": "b8bbe68e-f235-461a-91e3-2fa454f82749"
    },
    {
      "id": "e5d11a7d-64da-453e-a317-4ca7fb287e3b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "265c372a-2c88-490b-9440-5929df209beb",
      "target": "eeee0937-10e0-4586-91c2-67ca462f788f"
    },
    {
      "id": "13cf9333-ef73-4fa3-92ab-4b0b7855ecbd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "16a73c60-6c02-485b-8220-d2898a20bd3e",
      "target": "2c7fe19a-cf14-4dae-8172-9cb579909848"
    },
    {
      "id": "bc85061c-309b-4249-8977-bc1eb48b73a0",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "81e0dd1f-2c0a-4a73-93ac-b7d87d8318d8",
      "target": "42b0ae2d-6cac-4243-b6e2-37425aa903e9"
    },
    {
      "id": "5d0b1be9-bb60-46dd-83fb-6428af9fcd12",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8275b113-9006-4695-b890-94b88a84d76c",
      "target": "0f31cfdb-4a6a-4235-95ec-cd5ba3f0e4d8"
    },
    {
      "id": "d4f6988c-7992-4a6e-8695-7302a315e42b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c0b732d7-388c-403d-b520-6858c5903bd4",
      "target": "44a8549a-0fd1-43c9-a205-bde0d7cb97cc"
    },
    {
      "id": "77c653c4-9114-4b16-a97c-0cbba8ca715f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3befff07-86fe-4546-959b-01819a409bbd",
      "target": "8ff7ea61-c345-4aee-864f-f9ce07589289"
    },
    {
      "id": "402c638a-b8e4-489b-8b73-05018a717033",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "62818a74-7d9c-4217-900d-be4fef18de20",
      "target": "5f12e9a7-aee2-4b6f-8642-824d3e20d638"
    },
    {
      "id": "ce5c7972-247f-4149-aa2f-798e27fe89a8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "33da5625-37e9-4969-9a53-0507ca2d21ba",
      "target": "2067f179-e7b2-4c5f-a6b4-bcaa6e12c53b"
    },
    {
      "id": "e4d81b75-d693-4ae1-bbb4-161cbc4f1ebe",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "cc1d948d-f8e3-4a55-9acb-faba01e5c41d",
      "target": "a03b5e86-cb9f-4b2d-bfc9-d88edf6bb4c9"
    },
    {
      "id": "501cb1d1-6ef0-4f93-893a-af8460dbeeda",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2c5e1cf7-4bba-47f8-b40d-1063adb3da74",
      "target": "52f303f7-7945-46b5-863d-ebd55e44369c"
    },
    {
      "id": "fa67c965-916d-4265-a335-81b2dc40598b",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c0b732d7-388c-403d-b520-6858c5903bd4",
      "target": "a385b082-aeda-45ca-b0bb-eb8b0073d8b2"
    },
    {
      "id": "76f39c1e-5ed6-4ff8-954b-d981d089f071",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "51237bae-e942-44bd-ace6-02b552253d85",
      "target": "a2e8a795-b38c-4cdf-8719-c7d7121f9b57"
    },
    {
      "id": "59b81d42-d374-48fa-b72b-70f328e87549",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7d9d50fa-740e-41bf-ab37-b961edde7ac4",
      "target": "cdf0bc7f-54ae-44f5-b230-a4dcda8a9442"
    },
    {
      "id": "15c110ae-4273-4618-b5d2-d93792474b0a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "05f62a6a-0283-4e9b-87ce-2b5700ac248e",
      "target": "78803f17-efde-4187-be9a-8e7eb8b4b2bd"
    },
    {
      "id": "5b7c2473-9511-476b-8182-7f861fd86f62",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c19273ea-02a2-458d-bc70-684d1f30d4f2",
      "target": "543e3b8a-d292-44d7-9e37-28cde3ca0e37"
    },
    {
      "id": "69e23561-ac16-4822-94e4-2f0e36ab3406",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c5ab9000-3f63-4397-aac3-acbbbcaeb90b",
      "target": "75df8751-561f-421d-b5f3-0cf8c5977fcb"
    },
    {
      "id": "1a677fbe-bb0c-4b59-bb91-8df019b3b27e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d34f163b-3fdf-4c47-9a94-321d2ec4509b",
      "target": "08e9259a-7d11-43f3-b344-0947dd58ca7b"
    },
    {
      "id": "a86d1c27-4936-406a-adf3-57a1a4942c2f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e4ff2adf-2fa9-4ad4-8953-d551bb3c5d62",
      "target": "94bc1030-436f-4840-a79a-d0b50ab87ec2"
    },
    {
      "id": "b1e38c79-6880-4044-a29a-1123b6685afd",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8fb9abcc-cc6c-475b-8895-8f74b77c9404",
      "target": "7db3ea62-a752-472c-97b8-259f361468e2"
    },
    {
      "id": "5b663b63-41aa-4609-8174-da01d7c9f8ea",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "3bc21ecd-15f5-4301-940e-69367b95f91a",
      "target": "e0aa307f-ea3a-4da9-8003-377f38eab1b5"
    },
    {
      "id": "acac19e4-015a-44d5-8143-7b537eac9c73",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "2aea9b34-1a30-4ef9-a8e0-8c7520b5d57e",
      "target": "b1b36864-cac5-46a3-bfd5-6b58f33fe1bd"
    },
    {
      "id": "34670336-695b-4e50-85b8-4e8d6dd9830d",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "ad754385-5639-4fd3-a940-1748bfda4be5",
      "target": "48914a82-fa51-4c89-b2ea-c4647a202319"
    },
    {
      "id": "1e334d5f-f29e-4ee2-81ed-3f63845ad863",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "199dc595-ef32-4a39-91b7-2e35e4936377",
      "target": "4fddc9c9-b3b5-4607-ab31-c7cd9f1701a7"
    },
    {
      "id": "04b1f50d-a0ce-42a4-9efb-9c3ab4a2a5d4",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "82909e6a-57a2-45e9-99c0-3cb0ad654e49",
      "target": "b8540838-4ac4-48ab-8c50-22b42fe604c3"
    },
    {
      "id": "ef9b2d2e-8e6a-4b6c-afb0-c81206810d60",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "5366f0eb-e298-4455-a99a-167723d55aed",
      "target": "390def74-3c8a-4215-9913-95951d6621ed"
    },
    {
      "id": "515ec38b-080e-4e4b-abfe-330f85daaaab",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "e4f8bf1f-9c47-480c-b518-2cfbebc9abf5",
      "target": "c2e2971b-ded0-4907-bae2-080098bce87e"
    },
    {
      "id": "87eb2020-0408-4e13-9a31-295eb80d0574",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "7f5891c5-b722-4564-97fe-09b0181efcc4",
      "target": "71616517-5333-4ed1-8e8d-55c182f7dec1"
    },
    {
      "id": "8c39eea0-90bf-42e6-9232-7cdb94fcb34a",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "02f32b03-0703-4d8e-894e-efacfad8cbed",
      "target": "4e8637fa-49ea-4771-86b5-9aecee89959c"
    },
    {
      "id": "909eccd5-f3c2-4b9f-b08f-eb5ff1de0034",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "19e283f2-054e-424e-a43d-5719a12b3c0b",
      "target": "12417911-45d7-481f-9704-529f4d299714"
    },
    {
      "id": "f1b099ae-1412-44d6-8f1d-64243a310c48",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "31386d20-8d23-41d1-84ea-0b21be9fb782",
      "target": "9dbbb4f5-b825-4bb0-8118-7ebcab080c23"
    },
    {
      "id": "2b88689a-f135-4ac4-9ba4-37fada498b1e",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "8275b113-9006-4695-b890-94b88a84d76c",
      "target": "72bfbeb2-7561-4299-880a-0a95e64743e5"
    },
    {
      "id": "14572354-c6dc-45d5-8e43-a5d06815c149",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "6d6cf97f-17b2-4f74-a184-59e4c5efe56f",
      "target": "656db700-75c3-4d6e-8215-c09e399d579a"
    },
    {
      "id": "146cfcfa-4e86-4297-b969-f57e8cd307a6",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "c95b1106-541f-4ebe-8865-84ed594e3f0c",
      "target": "e96c2596-5336-4f04-a799-adb8905d0a5e"
    },
    {
      "id": "e930940f-3e51-45c0-b20d-78680595511f",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "660299b9-7bdc-4392-8a82-4a6285d73167",
      "target": "46e5e478-8d79-47d0-acc3-2dca8b941064"
    },
    {
      "id": "645bd5d9-7355-4c5a-aaa2-87da30c7b7e8",
      "data": { "type": "Investor", "weight": 1, "properties": {} },
      "source": "d295f38d-45f8-4ece-be44-73d7b7706e6e",
      "target": "60b67a25-437e-45c4-87c8-4941c4f15d21"
    }
  ]
}

const size = (node) => Math.max(...node.style.size);

const graph = new Graph({
  data,
  autoFit: 'view',
  node: {
    style: {
      fillOpacity: 1,
      label: true,
      labelText: (d) => d.data?.name,
      labelBackground: true,
      icon: true,
      iconText: (d) => (d.data?.type === 'Investor' ? '💰' : '🦄️'),
      fill: (d) => (d.data?.type === 'Investor' ? '#6495ED' : '#FFA07A'),
    },
    state: {
      inactive: {
        fillOpacity: 0.3,
        icon: false,
        label: false,
      },
    },
  },
  edge: {
    style: {
      label: false,
      labelText: (d) => d.data?.type,
      labelBackground: true,
    },
    state: {
      active: {
        label: true,
      },
      inactive: {
        strokeOpacity: 0,
      },
    },
  },
  layout: {
    type: 'd3-force',
    link: { distance: (edge) => size(edge.source) + size(edge.target) },
    collide: { radius: (node) => size(node) },
    manyBody: { strength: (node) => -4 * size(node) },
    animation: false,
  },
  transforms: [
    {
      type: 'map-node-size',
      scale: 'linear',
      maxSize: 60,
      minSize: 20,
    },
  ],
  behaviors: [
    'drag-canvas',
    'zoom-canvas',
    function () {
      return {
        key: 'hover-activate',
        type: 'hover-activate',
        enable: true,
        degree: 1,
        inactiveState: 'inactive',
        onHover: (e) => {
          this.frontElement(e.target.id);
          e.view.setCursor('pointer');
        },
        onHoverEnd: (e) => {
          e.view.setCursor('default');
        },
      };
    },
    {
      type: 'fix-element-size',
      enable: true,
    },
    {
      type: 'auto-adapt-label',
      syncToKeySize: { maxFontSize: 16, minFontSize: 12 },
    },
  ],
  animation: false,
});

graph.render();

const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Network Map of 🦄 Unicorns and Their 💰Investors - 1086 nodes, 1247 edges';
container.appendChild(descriptionDiv);
