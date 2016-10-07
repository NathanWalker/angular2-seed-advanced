// angular
import { Component, ChangeDetectionStrategy } from '@angular/core';

// app
import { ViewBroker } from '../index';

declare var Reflect: any;
const _reflect: any = Reflect;

export class DecoratorUtils {
  public static getMetadata(metadata: any = {}, customDecoratorMetadata?: any) {
    /**
     * The following allows default component metadata to be configured
     */
    // default directives
    let PROVIDERS: any[] = [];

    // custom decorator options
    if (customDecoratorMetadata) {
      if (customDecoratorMetadata.providers) {
        PROVIDERS.push(...customDecoratorMetadata.providers);
      }
    }

    if (metadata.templateUrl) {
      // correct view for platform target
      metadata.templateUrl = ViewBroker.TEMPLATE_URL(metadata.templateUrl);
    }

    if (metadata.styleUrls) {
      // correct view for platform target
      metadata.styleUrls = ViewBroker.STYLE_URLS(metadata.styleUrls);
    }

    metadata.providers = metadata.providers ? metadata.providers.concat(PROVIDERS) : PROVIDERS;

    if (metadata.changeDetection) {
      metadata.changeDetection = metadata.changeDetection;
    } else {
      // default OnPush
      metadata.changeDetection = ChangeDetectionStrategy.OnPush;
    }

    if (metadata.encapsulation) {
      metadata.encapsulation = metadata.encapsulation;
    }

    // initialize anything
    if (metadata.init) {
      metadata.init();
    }

    return metadata;
  }

  public static annotateComponent(cls: any, metadata: any = {}, customDecoratorMetadata?: any) {
    let annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new Component(DecoratorUtils.getMetadata(metadata, customDecoratorMetadata)));
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  }
}
