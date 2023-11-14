declare module "@ioc:core.ImpactRatingProvider" {
  import { IImpactRatingService } from "App/Services/ImpactRatingService";

  const ImpactRatingProvider: IImpactRatingService;
  export default ImpactRatingProvider;
}
