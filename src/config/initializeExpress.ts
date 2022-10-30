import cors from 'cors'
import 'dotenv-safe/config'
import express from 'express'
import session from 'express-session'
import 'reflect-metadata'
import { COOKIE_NAME } from '../common/constants'
import initializeRedis from './redisConfig'

const APOLLO_STUDIO_URL = 'https://studio.apollographql.com'

export default function initializeExpress() {
  const { redisStore, redisClient } = initializeRedis()

  const app = express()

  app.set('trust proxy', process.env.NODE_ENV !== 'production')
  app.use(
    cors({
      origin: [
        'https://studio.apollographql.com',
        'http://localhost:3000',
        'http://localhost:3002',
        'http://social.coreyburns.dev',
        'http://143.198.37.31:3002',
      ],
      credentials: true,
    }),
  )
  app.use(
    session({
      name: COOKIE_NAME,
      store: new redisStore({
        client: redisClient,
      }),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        sameSite: 'lax',
        secure: 'auto',
        // sameSite: 'none',
        // secure: true,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
  )

  return { app }
}
