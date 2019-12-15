import express from 'express';

export const userRoute = express.Router();

userRoute.post('/update', async ({ body }, res) => {
  new Promise(reslv => setTimeout(() => {
    reslv(
      res.json({ user: { username: body.username } })
    );
  }, 1000))
});