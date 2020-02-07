ably-utility

-- a super bare-bone developers utility for sending Ably messages

clone the repo

create a .env file containing your ablyKey

    ablyKey=your.key:here

run: npm install

execute: node index.js

params

    channel: the channel name
    message: the message text
    payload: the payload text
   
sample:

```
$ node index.js --channel "CCCache" --message "CCObjectDeleted" --payload "CCObjectId:19279182"

read args, channel: CCCache message: CCObjectDeleted payload: CCObjectId:19279182
read .env, ablyKey: your.key:here
connecting to Ably...
ably connected
got ably channel: CCCache
ably published: CCObjectDeleted with payload: CCObjectId:19279182
```