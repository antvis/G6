#!/bin/bash

pnpm changeset 
pnpm changeset version

cd ./packages/g6 && npm run version