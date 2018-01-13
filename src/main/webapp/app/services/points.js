import Request from './request';

class PointService {
    get() {
        const request = new Request();
        return request.get('points');
    }
}

export default PointService;
export { PointService };
