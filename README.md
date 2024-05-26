## Installation:-
1. Clone the repository:
    ```
      git clone https://github.com/LepharamRamchiary/Status_Tracking_API.git
    ```

2. Install dependencies:
    ```
      cd Status_Tracking_API
      npm install
      or
      npm install bcryptjs body-parser dotenv express jsonwebtoken mongoose nodemailer
      and nodemon for devDependencies
      npm install nodemon -D
    ```
3. Set up `.env` file:
    ```
      PORT=3001
      MONGODB_URI="mongoDB URL"
      SECRET_KEY="Generate_rendom_your_own"
      EMAIL=example@gmail.com
      EMAIL_PASSWORD=example123
    ```
4. Generation of `SECRET_KEY`:
    ```
      node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
    ```
5. For `email` and `password` (smtp)
    ```
      I enable two-step verification for my Google account. Then, I access the app password settings to generate one, creating a new email address and password.
    ```
6. Start the development server:
   ```
     For NodeJS :-
     npm start
     or
     npm run start
   ```
   ```
     For nodemon :-
     npm dev
     or
     npm run dev
   ```
7. Postman Docs:
   ```
     https://documenter.getpostman.com/view/26300273/2sA3Qqgt3S
   ```
