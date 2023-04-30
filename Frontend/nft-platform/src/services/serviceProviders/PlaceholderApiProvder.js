import CoreApi from '../CoreApi';


class PlaceholderApiProvider extends CoreApi {
  constructor(endpoint) {
    super('http://localhost:4000', endpoint);
  }
}

export default PlaceholderApiProvider;
