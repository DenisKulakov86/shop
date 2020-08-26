import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  TemplateRef,
  AfterViewChecked,
  AfterViewInit,
  AfterContentInit,
  Inject,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'file-upload',
  template: `
    <div class="form-group ">
      <label for="picture">Изображение</label>
      <input class="form-control-file" id="picture" type="file" />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  @ViewChild('input', { static: false }) input: TemplateRef<any>;
  onChange: Function;
  constructor(private host: ElementRef<HTMLInputElement>) {}
  ngOnInit() {}

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => this.onChange(reader.result);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {}
  writeValue(value) {}
}
