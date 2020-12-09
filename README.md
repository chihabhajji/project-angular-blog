Forked from https://stackblitz.com/edit/angular-8-registration-login-example

  - let people clone it so they have their own sandbox

---

  - Stored content injection
    + Create a payment with <img src=https://i.imgur.com/lGYkhyP.jpg> as a reference
  - Reflected XSS
    + http://localhost:4200/payments/new?fromAccountId=asd%3Cimg%20src%3Dx%20onerror%3Dalert(1)%20%2F%3E
  - Information Disclosure
    + Get another user's account balance
      * Change the param on the API
    + Healthcheck page exposing information
      * http://localhost:4200/health
  - Client-side Logic
    + Bypass the step-up check
  - Broken Access Control
    + Modify the JWT to become an authoriser
  - Supply chain attack
    + Compromised JS exfilling password
  - Weak password


Todo:

  - Deploy to Firebase
  - Modify bank balances after transfers
  - Step Up