# farm-automation-api
API backend for the farm-automation project. Serves planter data and current weather from services

Uses:
- Express
- Typescript
- Sequelize
- Docker
- Postgres

How to run:

with docker installed and running, run the command `sudo docker-compose up --build` to automatically create a postgres db, run migrations, seed the database, and start the api

How to set up on a new raspberry pi:
- Install raspbian 32 bit lite edition on the pi (assuming 3A+)
- `sudo apt install python python-dev git docker docker-compose`
- git clone this project, cd into the directory
- `python3 -m venv ~/venv`
- `source ~/venv/bin/activate`
- `pip install RPi.GPIO spidev requests`
If setting up the main pi hosting the API and sensors, do the following:
- `crontab -e`, choose your editor, then add these lines:
```
*/10 * * * * python3 ~/farm-automation-api/moisture.py
@reboot cd ~/farm-automation-api && sudo docker-compose up
```
Otherwise to set up the sensors, do this:

- `crontab -e`, choose your editor, then add these lines:
```
*/10 * * * * python3 ~/farm-automation-api/moisture.py --api-host https://your-api-server-address.com
```
It should now be taking measurements every 10 minutes and sending it to the API
