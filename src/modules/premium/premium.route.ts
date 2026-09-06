import { Router } from "express"

import { auth } from "../../middleware/auth"
import { Role } from "../../../generated/prisma/enums"
import { premiumController } from "./premium.controller"
import { subscriptionGuard } from "../../middleware/premiumGuard"

const router = Router()



// get premium content 
router.get('/',auth(Role.ADMIN,Role.USER,Role.AUTHOR),subscriptionGuard(),premiumController.getPremium )




export const premiumRoutes = router