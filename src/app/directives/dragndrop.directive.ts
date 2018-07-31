import { Directive, HostListener, HostBinding, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appDragndrop]'
})
export class DragndropDirective {
  @HostBinding('style.background') private background = '#eee';

  @Output() private filesChangeEmiter : EventEmitter<FileList> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee'
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      
      this.filesChangeEmiter.emit(files);
      this.background = '#eee'
      
    }
  }

}
