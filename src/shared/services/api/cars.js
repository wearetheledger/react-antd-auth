import { authRequest } from './request';

function getCars() {
    return authRequest({
        url: `/cars`,
        method: 'GET'
    });
}

const CarService = {
    getCars
};

export default CarService;
