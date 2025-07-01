# מדריך לאינטגרציה עם Spotify API

מדריך זה יעזור לך להגדיר את האינטגרציה של האפליקציה שלך עם Spotify API.

## שלב 1: יצירת אפליקציה ב-Spotify Developer Dashboard

1. היכנס ל-[Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. לחץ על "Create App" (או "Create An App")
3. מלא את הפרטים הבאים:
   - **App name**: שם האפליקציה שלך (למשל "FRETONE")
   - **App description**: תיאור קצר של האפליקציה
   - **Redirect URI**: הכתובת שאליה ספוטיפיי יפנה את המשתמש לאחר האימות
     - לפיתוח מקומי: `http://127.0.0.1:3000/callback` או `http://localhost:3000/callback`
     - לפיתוח עם ngrok: `https://your-ngrok-url.ngrok-free.app/callback`
     - לייצור: `https://your-domain.com/callback`
   - **Website**: כתובת האתר שלך (אופציונלי)

4. סמן את תיבת הסימון "I agree to the Developer Terms of Service"
5. לחץ על "Save"

## שלב 2: השגת Client ID ו-Client Secret

1. לאחר יצירת האפליקציה, תועבר לדף האפליקציה
2. כאן תוכל לראות את ה-**Client ID** שלך
3. לחץ על "Show Client Secret" כדי לראות את ה-**Client Secret**
4. שמור את שני הערכים האלה במקום בטוח - תצטרך אותם להגדרת האפליקציה

## שלב 3: הגדרת Redirect URIs

1. בדף האפליקציה, לחץ על "Edit Settings"
2. תחת "Redirect URIs", הוסף את כל הכתובות שאליהן ספוטיפיי יכול להפנות משתמשים לאחר האימות:
   - לפיתוח מקומי: `http://127.0.0.1:3000/callback` או `http://localhost:3000/callback`
   - לפיתוח עם ngrok: `https://your-ngrok-url.ngrok-free.app/callback`
   - לייצור: `https://your-domain.com/callback`
3. לחץ על "Add" אחרי כל כתובת
4. לחץ על "Save" בתחתית הדף

## שלב 4: הגדרת האפליקציה שלך

1. צור קובץ `.env` בתיקיית הפרויקט שלך (או ערוך את הקובץ הקיים)
2. הוסף את השורות הבאות:
   ```
   VITE_SPOTIFY_CLIENT_ID=your-client-id
   VITE_SPOTIFY_CLIENT_SECRET=your-client-secret
   ```
3. החלף את `your-client-id` ו-`your-client-secret` בערכים האמיתיים שקיבלת מ-Spotify Developer Dashboard

## שלב 5: הגדרת ngrok (אופציונלי, לפיתוח מקומי)

אם אתה מפתח מקומית ונתקל בבעיות עם Redirect URI, תוכל להשתמש ב-ngrok כדי ליצור מנהרה מאובטחת:

1. הורד והתקן את [ngrok](https://ngrok.com/download)
2. הירשם לחשבון ngrok והשג את ה-authtoken שלך
3. הגדר את ה-authtoken:
   ```
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```
4. הפעל את ngrok כדי ליצור מנהרה לפורט 3000:
   ```
   ngrok http 3000
   ```
5. העתק את כתובת ה-URL שתקבל (למשל `https://abc123.ngrok-free.app`)
6. הוסף את הכתובת + `/callback` לרשימת ה-Redirect URIs ב-Spotify Developer Dashboard:
   ```
   https://abc123.ngrok-free.app/callback
   ```
7. עדכן את קובץ `src/services/spotifyService.ts` עם הכתובת החדשה:
   ```javascript
   const REDIRECT_URI = 'https://abc123.ngrok-free.app/callback';
   ```
8. עדכן את קובץ `vite.config.ts` כדי לאפשר בקשות מהכתובת של ngrok:
   ```javascript
   server: {
     port: 3000,
     host: true,
     allowedHosts: [
       'abc123.ngrok-free.app'
     ]
   }
   ```

## שלב 6: בדיקת האינטגרציה

1. הפעל את האפליקציה שלך:
   ```
   npm run dev
   ```
2. נווט לדף האינטגרציות
3. לחץ על כפתור "Connect to Spotify"
4. אם הכל הוגדר נכון, תועבר לדף האימות של ספוטיפיי
5. אשר את ההרשאות המבוקשות
6. תועבר בחזרה לאפליקציה שלך, והחיבור לספוטיפיי יושלם

## פתרון בעיות נפוצות

### "This site can't be reached" אחרי אישור ההרשאות

בעיה זו מתרחשת כאשר ספוטיפיי מנסה לגשת ל-Redirect URI, אבל הדפדפן לא מצליח להתחבר לכתובת. פתרונות אפשריים:

1. וודא שהשרת שלך רץ על הפורט הנכון (3000)
2. וודא שה-Redirect URI ב-Spotify Developer Dashboard זהה בדיוק לזה שבקוד שלך
3. השתמש ב-ngrok כדי ליצור מנהרה מאובטחת (ראה שלב 5)

### "Authentication Error" אחרי אישור ההרשאות

בעיה זו יכולה להיגרם ממספר סיבות:

1. וודא שה-Client ID וה-Client Secret נכונים
2. וודא שה-Redirect URI זהה בדיוק בכל המקומות
3. וודא שיש לך את כל ההרשאות הנדרשות ב-Spotify Developer Dashboard
4. בדוק את הקונסול של הדפדפן לקבלת הודעות שגיאה ספציפיות יותר

### "No code verifier found" בקונסול

בעיה זו מתרחשת כאשר ה-code_verifier לא נשמר כראוי בתהליך האימות. פתרונות אפשריים:

1. וודא שאתה משתמש באותו חלון דפדפן לכל התהליך
2. נקה את ה-localStorage ונסה שוב
3. וודא שאתה לא משתמש במצב גלישה פרטית, שיכול להגביל את הגישה ל-localStorage
