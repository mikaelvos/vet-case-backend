import Express, { NextFunction, Request, Response, Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Filter, Options, RequestHandler } from 'http-proxy-middleware';
const router: Router = Express.Router();


// create a proxy for each microservice
const clientProxyMiddleware = createProxyMiddleware<Request, Response>({
  target: 'http://clients:3012/owners',
  changeOrigin: true
});

const appointmentProxyMiddleware = createProxyMiddleware<Request, Response>({
  target: 'http://appointments:3010/api/v1/appointments',
  changeOrigin: true
});


router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json('hi');
  next();
});

router.use('/appointments', appointmentProxyMiddleware);
router.use('/owners', clientProxyMiddleware);

export default router;
