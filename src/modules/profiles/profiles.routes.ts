import { Router } from 'express';
import { userProfiles } from './profiles.controller';
const router =  Router();

router.get("/",userProfiles.getUser)
router.post("/",userProfiles.createUser)




export const profileRoute = router;