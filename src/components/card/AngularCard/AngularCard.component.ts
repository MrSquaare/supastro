import { Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "angular-card",
  templateUrl: "./AngularCard.component.html",
})
class AngularCardComponent {
  @Input({ required: true }) dataTarget!: string;
  @Input({ required: true }) initialValue!: string;
}

export default AngularCardComponent as astroHTML.JSX.Element;
