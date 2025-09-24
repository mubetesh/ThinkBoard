import {Ratelimit} from '@upstash/ratelimit'; //used to create rate limiters 
import {Redis} from '@upstash/redis'; //used to connect to upstash redis instance 
import dotenv from 'dotenv';

dotenv.config();

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '1 m'), 
})

export default ratelimit;