import { readonly } from 'vue'
import api from '@/config/api.config'
import app from '@/config/app.config'
import validator from '@/config/validator.config'
import route from '@/config/route.config'

const common = {

}

export default {
	app : readonly(app),
	common : readonly(common),
	route : readonly(route),
	api: readonly(api),
	validator : readonly(validator),
}
