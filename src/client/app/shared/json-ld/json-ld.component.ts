import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-json-ld',
  template: '<div [innerHTML]="jsonLD"></div>'
})
export class JsonLdComponent implements OnChanges {
  jsonLD: SafeHtml;
  @Input() name;
  @Input() description;
  @Input() doi;
  @Input() type;
  @Input() publisher;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    let itemType = '';
    if (this.type === 'dig') {
      itemType = 'CollectionPage';
    } else {
      itemType = 'ItemPage'
    }
    /* tslint:disable */
    const json = {
      "@context": "http://schema.org",
      "@type": itemType,
      "name": this.name,
      "sameAs": this.doi,
      "publisher": {
        "@type": "Organization",
        "name": this.publisher
      },
      "description": this.description
    };
    /* tslint:enable */
    this.jsonLD = this.getSafeHTML(json);
  }

  getSafeHTML(value: {}) {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value ? JSON.stringify(value, null, 2).replace(/\//g, '\\/') : '';
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
