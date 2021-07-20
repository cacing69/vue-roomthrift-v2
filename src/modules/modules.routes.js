import homeRoutes from '@/modules/home/home.routes';
import loginRoutes from '@/modules/login/login.routes';

const routesModule = [
    ...loginRoutes,
    ...homeRoutes,
]

export default routesModule;
