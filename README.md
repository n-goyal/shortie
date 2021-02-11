[![codecov](https://codecov.io/gh/n-goyal/shortie/branch/master/graph/badge.svg?token=LNJ30EYSJY)](https://codecov.io/gh/n-goyal/shortie)

## 🎉Welcome to this very basic implementation of urlShortner.

-   Project implements a basic express backend with mongodb data base hosted on
    MongoDB Atlas 🌏.
-   While the implementation of a url shortner is the objective🚩, however this
    project aims to implements CICD and docker builds for automated deployments
    🔃🔜 and scalability 💪💪.

One can follow the steps below to run the app on their local system (ofcourse OS
doesn't matter) ➡️➡️

To run this server on your local system

1. clone/download this repo 📚
2. create a .env file and update mongoDB Atlas connection string for the
   application. It would look something like:
   `mongodb+srv://<username>:<password>@freetiercluster.3ruzd.mongodb.net/<db-name>?retryWrites=true&w=majority`
3. install docker if not installed
4. run 🏃‍♂️ `docker build --pull --rm -f "dockerfile" -t shortie:latest "."`
5. now, once image build is complete, run 🏃‍♂️
   `docker run --rm -d -p 2390:2390/tcp shortie:latest`
6. now, do a post request↗️ to create a short url _or_ you can use the existing
   request in `/requests/api.http` folder
