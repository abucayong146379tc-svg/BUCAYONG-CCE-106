# CCE106 Secure Profile App

## Student Information

**Name:** Allen Joseph M. Bucayong  
**Course:** BSIT  
**Subject:** CCE106  
**Code:**  2013

## Description

This is a Secure Profile App built using Expo React Native.

The application uses the DummyJSON REST API for authentication and profile information. The returned access token is securely stored using Expo SecureStore.

## Features

- User login using DummyJSON API
- Secure access token storage using Expo SecureStore
- Protected profile request using Bearer token authentication
- Session restoration after app reload
- Logout functionality
- Invalid login error handling
- Loading state
- Authenticated profile state
- Logged-out state

## Test Account

**Username:** `emilys`

**Password:** `emilyspass`

## Technologies Used

- React Native
- Expo SDK 57
- Expo Router
- Expo SecureStore
- DummyJSON REST API

## Installation

Install the project dependencies:

```bash
npm install

## Short Reflection

### 1. Why is SecureStore more appropriate than plain-text storage for an access token?

SecureStore is more appropriate because it is designed for securely storing sensitive information such as access tokens. It is safer than storing the token in plain-text app storage.

### 2. What is the purpose of the Authorization header?

The Authorization header sends the access token with the protected request. The app uses the Bearer scheme so the API can verify the user's authenticated session before returning protected profile information.

### 3. What should the app do when a stored token is expired or rejected?

The app should delete the rejected token from SecureStore and return the user to the login screen. This prevents the app from continuing to use an invalid session.