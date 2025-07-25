import {
  animate,
  sequence,
  style,
  transition,
  trigger
} from "./chunk-ALFBHST3.js";
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  FormsModule,
  MaxLengthValidator,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgModel,
  ReactiveFormsModule
} from "./chunk-SQL3LSW3.js";
import {
  AsyncPipe,
  CommonModule,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet,
  SlicePipe
} from "./chunk-NWLQKZME.js";
import "./chunk-FTJJFYDV.js";
import {
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  BehaviorSubject,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver$1,
  ContentChild,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  Optional,
  Output,
  Pipe,
  Renderer2,
  RendererFactory2,
  RuntimeError,
  Subject,
  ViewChild,
  ViewEncapsulation,
  __objRest,
  __spreadProps,
  __spreadValues,
  debounceTime,
  distinctUntilChanged,
  filter,
  inject,
  map,
  merge,
  setClassMetadata,
  shareReplay,
  takeUntil,
  tap,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefinePipe,
  ɵɵdirectiveInject,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵinvalidFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵpipeBind3,
  ɵɵpipeBind4,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-GI7JPS3Z.js";

// node_modules/@angular/animations/fesm2022/animations.mjs
var AnimationBuilder = class _AnimationBuilder {
  static ɵfac = function AnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnimationBuilder)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _AnimationBuilder,
    factory: () => (() => inject(BrowserAnimationBuilder))(),
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root",
      useFactory: () => inject(BrowserAnimationBuilder)
    }]
  }], null, null);
})();
var AnimationFactory = class {
};
var BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
  animationModuleType = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  _nextAnimationId = 0;
  _renderer;
  constructor(rootRenderer, doc) {
    super();
    const typeData = {
      id: "0",
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {
        animation: []
      }
    };
    this._renderer = rootRenderer.createRenderer(doc.body, typeData);
    if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
      throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
    }
  }
  build(animation2) {
    const id = this._nextAnimationId;
    this._nextAnimationId++;
    const entry = Array.isArray(animation2) ? sequence(animation2) : animation2;
    issueAnimationCommand(this._renderer, null, id, "register", [entry]);
    return new BrowserAnimationFactory(id, this._renderer);
  }
  static ɵfac = function BrowserAnimationBuilder_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BrowserAnimationBuilder)(ɵɵinject(RendererFactory2), ɵɵinject(DOCUMENT));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _BrowserAnimationBuilder,
    factory: _BrowserAnimationBuilder.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationBuilder, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: RendererFactory2
  }, {
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var BrowserAnimationFactory = class extends AnimationFactory {
  _id;
  _renderer;
  constructor(_id, _renderer) {
    super();
    this._id = _id;
    this._renderer = _renderer;
  }
  create(element, options) {
    return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
  }
};
var RendererAnimationPlayer = class {
  id;
  element;
  _renderer;
  parentPlayer = null;
  _started = false;
  constructor(id, element, options, _renderer) {
    this.id = id;
    this.element = element;
    this._renderer = _renderer;
    this._command("create", options);
  }
  _listen(eventName, callback) {
    return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
  }
  _command(command, ...args) {
    issueAnimationCommand(this._renderer, this.element, this.id, command, args);
  }
  onDone(fn) {
    this._listen("done", fn);
  }
  onStart(fn) {
    this._listen("start", fn);
  }
  onDestroy(fn) {
    this._listen("destroy", fn);
  }
  init() {
    this._command("init");
  }
  hasStarted() {
    return this._started;
  }
  play() {
    this._command("play");
    this._started = true;
  }
  pause() {
    this._command("pause");
  }
  restart() {
    this._command("restart");
  }
  finish() {
    this._command("finish");
  }
  destroy() {
    this._command("destroy");
  }
  reset() {
    this._command("reset");
    this._started = false;
  }
  setPosition(p) {
    this._command("setPosition", p);
  }
  getPosition() {
    return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
  }
  totalTime = 0;
};
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.ɵtype;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.ɵtype;
  return type === 0 || type === 1;
}

// node_modules/luxon/src/errors.js
var LuxonError = class extends Error {
};
var InvalidDateTimeError = class extends LuxonError {
  constructor(reason) {
    super(`Invalid DateTime: ${reason.toMessage()}`);
  }
};
var InvalidIntervalError = class extends LuxonError {
  constructor(reason) {
    super(`Invalid Interval: ${reason.toMessage()}`);
  }
};
var InvalidDurationError = class extends LuxonError {
  constructor(reason) {
    super(`Invalid Duration: ${reason.toMessage()}`);
  }
};
var ConflictingSpecificationError = class extends LuxonError {
};
var InvalidUnitError = class extends LuxonError {
  constructor(unit) {
    super(`Invalid unit ${unit}`);
  }
};
var InvalidArgumentError = class extends LuxonError {
};
var ZoneIsAbstractError = class extends LuxonError {
  constructor() {
    super("Zone is an abstract class");
  }
};

// node_modules/luxon/src/impl/formats.js
var n = "numeric";
var s = "short";
var l = "long";
var DATE_SHORT = {
  year: n,
  month: n,
  day: n
};
var DATE_MED = {
  year: n,
  month: s,
  day: n
};
var DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s
};
var DATE_FULL = {
  year: n,
  month: l,
  day: n
};
var DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};
var TIME_SIMPLE = {
  hour: n,
  minute: n
};
var TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};
var TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
var TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23"
};
var TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: s
};
var TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: l
};
var DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};
var DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};
var DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};
var DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};
var DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
var DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};
var DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};

// node_modules/luxon/src/zone.js
var Zone = class {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new ZoneIsAbstractError();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new ZoneIsAbstractError();
  }
  /**
   * The IANA name of this zone.
   * Defaults to `name` if not overwritten by a subclass.
   * @abstract
   * @type {string}
   */
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new ZoneIsAbstractError();
  }
};

// node_modules/luxon/src/zones/systemZone.js
var singleton = null;
var SystemZone = class _SystemZone extends Zone {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    if (singleton === null) {
      singleton = new _SystemZone();
    }
    return singleton;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale);
  }
  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }
  /** @override **/
  equals(otherZone) {
    return otherZone.type === "system";
  }
  /** @override **/
  get isValid() {
    return true;
  }
};

// node_modules/luxon/src/zones/IANAZone.js
var dtfCache = /* @__PURE__ */ new Map();
function makeDTF(zoneName) {
  let dtf = dtfCache.get(zoneName);
  if (dtf === void 0) {
    dtf = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zoneName,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      era: "short"
    });
    dtfCache.set(zoneName, dtf);
  }
  return dtf;
}
var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
}
function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date);
  const filled = [];
  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i];
    const pos = typeToPos[type];
    if (type === "era") {
      filled[pos] = value;
    } else if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}
var ianaZoneCache = /* @__PURE__ */ new Map();
var IANAZone = class _IANAZone extends Zone {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(name) {
    let zone = ianaZoneCache.get(name);
    if (zone === void 0) {
      ianaZoneCache.set(name, zone = new _IANAZone(name));
    }
    return zone;
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    ianaZoneCache.clear();
    dtfCache.clear();
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
   * @return {boolean}
   */
  static isValidSpecifier(s2) {
    return this.isValidZone(s2);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(zone) {
    if (!zone) {
      return false;
    }
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
      return true;
    } catch (e) {
      return false;
    }
  }
  constructor(name) {
    super();
    this.zoneName = name;
    this.valid = _IANAZone.isValidZone(name);
  }
  /**
   * The type of zone. `iana` for all instances of `IANAZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "iana";
  }
  /**
   * The name of this zone (i.e. the IANA zone name).
   * @override
   * @type {string}
   */
  get name() {
    return this.zoneName;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns false for all IANA zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return false;
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale, this.name);
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @override
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    if (!this.valid) return NaN;
    const date = new Date(ts);
    if (isNaN(date)) return NaN;
    const dtf = makeDTF(this.name);
    let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
    if (adOrBc === "BC") {
      year = -Math.abs(year) + 1;
    }
    const adjustedHour = hour === 24 ? 0 : hour;
    const asUTC = objToLocalTS({
      year,
      month,
      day,
      hour: adjustedHour,
      minute,
      second,
      millisecond: 0
    });
    let asTS = +date;
    const over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return (asUTC - asTS) / (60 * 1e3);
  }
  /**
   * Return whether this Zone is equal to another zone
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }
  /**
   * Return whether this Zone is valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return this.valid;
  }
};

// node_modules/luxon/src/impl/locale.js
var intlLFCache = {};
function getCachedLF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlLFCache[key];
  if (!dtf) {
    dtf = new Intl.ListFormat(locString, opts);
    intlLFCache[key] = dtf;
  }
  return dtf;
}
var intlDTCache = /* @__PURE__ */ new Map();
function getCachedDTF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlDTCache.get(key);
  if (dtf === void 0) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache.set(key, dtf);
  }
  return dtf;
}
var intlNumCache = /* @__PURE__ */ new Map();
function getCachedINF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let inf = intlNumCache.get(key);
  if (inf === void 0) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache.set(key, inf);
  }
  return inf;
}
var intlRelCache = /* @__PURE__ */ new Map();
function getCachedRTF(locString, opts = {}) {
  const _a = opts, { base } = _a, cacheKeyOpts = __objRest(_a, ["base"]);
  const key = JSON.stringify([locString, cacheKeyOpts]);
  let inf = intlRelCache.get(key);
  if (inf === void 0) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache.set(key, inf);
  }
  return inf;
}
var sysLocaleCache = null;
function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else {
    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
    return sysLocaleCache;
  }
}
var intlResolvedOptionsCache = /* @__PURE__ */ new Map();
function getCachedIntResolvedOptions(locString) {
  let opts = intlResolvedOptionsCache.get(locString);
  if (opts === void 0) {
    opts = new Intl.DateTimeFormat(locString).resolvedOptions();
    intlResolvedOptionsCache.set(locString, opts);
  }
  return opts;
}
var weekInfoCache = /* @__PURE__ */ new Map();
function getCachedWeekInfo(locString) {
  let data = weekInfoCache.get(locString);
  if (!data) {
    const locale = new Intl.Locale(locString);
    data = "getWeekInfo" in locale ? locale.getWeekInfo() : locale.weekInfo;
    if (!("minimalDays" in data)) {
      data = __spreadValues(__spreadValues({}, fallbackWeekSettings), data);
    }
    weekInfoCache.set(locString, data);
  }
  return data;
}
function parseLocaleString(localeStr) {
  const xIndex = localeStr.indexOf("-x-");
  if (xIndex !== -1) {
    localeStr = localeStr.substring(0, xIndex);
  }
  const uIndex = localeStr.indexOf("-u-");
  if (uIndex === -1) {
    return [localeStr];
  } else {
    let options;
    let selectedStr;
    try {
      options = getCachedDTF(localeStr).resolvedOptions();
      selectedStr = localeStr;
    } catch (e) {
      const smaller = localeStr.substring(0, uIndex);
      options = getCachedDTF(smaller).resolvedOptions();
      selectedStr = smaller;
    }
    const { numberingSystem, calendar } = options;
    return [selectedStr, numberingSystem, calendar];
  }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    if (!localeStr.includes("-u-")) {
      localeStr += "-u";
    }
    if (outputCalendar) {
      localeStr += `-ca-${outputCalendar}`;
    }
    if (numberingSystem) {
      localeStr += `-nu-${numberingSystem}`;
    }
    return localeStr;
  } else {
    return localeStr;
  }
}
function mapMonths(f) {
  const ms = [];
  for (let i = 1; i <= 12; i++) {
    const dt = DateTime.utc(2009, i, 1);
    ms.push(f(dt));
  }
  return ms;
}
function mapWeekdays(f) {
  const ms = [];
  for (let i = 1; i <= 7; i++) {
    const dt = DateTime.utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }
  return ms;
}
function listStuff(loc, length, englishFn, intlFn) {
  const mode = loc.listingMode();
  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}
function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || getCachedIntResolvedOptions(loc.locale).numberingSystem === "latn";
  }
}
var PolyNumberFormatter = class {
  constructor(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;
    const _a = opts, { padTo, floor } = _a, otherOpts = __objRest(_a, ["padTo", "floor"]);
    if (!forceSimple || Object.keys(otherOpts).length > 0) {
      const intlOpts = __spreadValues({ useGrouping: false }, opts);
      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }
  format(i) {
    if (this.inf) {
      const fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
      return padStart(fixed, this.padTo);
    }
  }
};
var PolyDateFormatter = class {
  constructor(dt, intl, opts) {
    this.opts = opts;
    this.originalZone = void 0;
    let z = void 0;
    if (this.opts.timeZone) {
      this.dt = dt;
    } else if (dt.zone.type === "fixed") {
      const gmtOffset = -1 * (dt.offset / 60);
      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
        z = offsetZ;
        this.dt = dt;
      } else {
        z = "UTC";
        this.dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({ minutes: dt.offset });
        this.originalZone = dt.zone;
      }
    } else if (dt.zone.type === "system") {
      this.dt = dt;
    } else if (dt.zone.type === "iana") {
      this.dt = dt;
      z = dt.zone.name;
    } else {
      z = "UTC";
      this.dt = dt.setZone("UTC").plus({ minutes: dt.offset });
      this.originalZone = dt.zone;
    }
    const intlOpts = __spreadValues({}, this.opts);
    intlOpts.timeZone = intlOpts.timeZone || z;
    this.dtf = getCachedDTF(intl, intlOpts);
  }
  format() {
    if (this.originalZone) {
      return this.formatToParts().map(({ value }) => value).join("");
    }
    return this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const parts = this.dtf.formatToParts(this.dt.toJSDate());
    if (this.originalZone) {
      return parts.map((part) => {
        if (part.type === "timeZoneName") {
          const offsetName = this.originalZone.offsetName(this.dt.ts, {
            locale: this.dt.locale,
            format: this.opts.timeZoneName
          });
          return __spreadProps(__spreadValues({}, part), {
            value: offsetName
          });
        } else {
          return part;
        }
      });
    }
    return parts;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
};
var PolyRelFormatter = class {
  constructor(intl, isEnglish, opts) {
    this.opts = __spreadValues({ style: "long" }, opts);
    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }
  format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  }
  formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  }
};
var fallbackWeekSettings = {
  firstDay: 1,
  minimalDays: 4,
  weekend: [6, 7]
};
var Locale = class _Locale {
  static fromOpts(opts) {
    return _Locale.create(
      opts.locale,
      opts.numberingSystem,
      opts.outputCalendar,
      opts.weekSettings,
      opts.defaultToEN
    );
  }
  static create(locale, numberingSystem, outputCalendar, weekSettings, defaultToEN = false) {
    const specifiedLocale = locale || Settings.defaultLocale;
    const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    const weekSettingsR = validateWeekSettings(weekSettings) || Settings.defaultWeekSettings;
    return new _Locale(localeR, numberingSystemR, outputCalendarR, weekSettingsR, specifiedLocale);
  }
  static resetCache() {
    sysLocaleCache = null;
    intlDTCache.clear();
    intlNumCache.clear();
    intlRelCache.clear();
    intlResolvedOptionsCache.clear();
    weekInfoCache.clear();
  }
  static fromObject({ locale, numberingSystem, outputCalendar, weekSettings } = {}) {
    return _Locale.create(locale, numberingSystem, outputCalendar, weekSettings);
  }
  constructor(locale, numbering, outputCalendar, weekSettings, specifiedLocale) {
    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.weekSettings = weekSettings;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this.weekdaysCache = { format: {}, standalone: {} };
    this.monthsCache = { format: {}, standalone: {} };
    this.meridiemCache = null;
    this.eraCache = {};
    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }
  get fastNumbers() {
    if (this.fastNumbersCached == null) {
      this.fastNumbersCached = supportsFastNumbers(this);
    }
    return this.fastNumbersCached;
  }
  listingMode() {
    const isActuallyEn = this.isEnglish();
    const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  }
  clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return _Locale.create(
        alts.locale || this.specifiedLocale,
        alts.numberingSystem || this.numberingSystem,
        alts.outputCalendar || this.outputCalendar,
        validateWeekSettings(alts.weekSettings) || this.weekSettings,
        alts.defaultToEN || false
      );
    }
  }
  redefaultToEN(alts = {}) {
    return this.clone(__spreadProps(__spreadValues({}, alts), { defaultToEN: true }));
  }
  redefaultToSystem(alts = {}) {
    return this.clone(__spreadProps(__spreadValues({}, alts), { defaultToEN: false }));
  }
  months(length, format = false) {
    return listStuff(this, length, months, () => {
      const monthSpecialCase = this.intl === "ja" || this.intl.startsWith("ja-");
      format &= !monthSpecialCase;
      const intl = format ? { month: length, day: "numeric" } : { month: length }, formatStr = format ? "format" : "standalone";
      if (!this.monthsCache[formatStr][length]) {
        const mapper = !monthSpecialCase ? (dt) => this.extract(dt, intl, "month") : (dt) => this.dtFormatter(dt, intl).format();
        this.monthsCache[formatStr][length] = mapMonths(mapper);
      }
      return this.monthsCache[formatStr][length];
    });
  }
  weekdays(length, format = false) {
    return listStuff(this, length, weekdays, () => {
      const intl = format ? { weekday: length, year: "numeric", month: "long", day: "numeric" } : { weekday: length }, formatStr = format ? "format" : "standalone";
      if (!this.weekdaysCache[formatStr][length]) {
        this.weekdaysCache[formatStr][length] = mapWeekdays(
          (dt) => this.extract(dt, intl, "weekday")
        );
      }
      return this.weekdaysCache[formatStr][length];
    });
  }
  meridiems() {
    return listStuff(
      this,
      void 0,
      () => meridiems,
      () => {
        if (!this.meridiemCache) {
          const intl = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(
            (dt) => this.extract(dt, intl, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(length) {
    return listStuff(this, length, eras, () => {
      const intl = { era: length };
      if (!this.eraCache[length]) {
        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(
          (dt) => this.extract(dt, intl, "era")
        );
      }
      return this.eraCache[length];
    });
  }
  extract(dt, intlOpts, field) {
    const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find((m) => m.type.toLowerCase() === field);
    return matching ? matching.value : null;
  }
  numberFormatter(opts = {}) {
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  }
  dtFormatter(dt, intlOpts = {}) {
    return new PolyDateFormatter(dt, this.intl, intlOpts);
  }
  relFormatter(opts = {}) {
    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  }
  listFormatter(opts = {}) {
    return getCachedLF(this.intl, opts);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || getCachedIntResolvedOptions(this.intl).locale.startsWith("en-us");
  }
  getWeekSettings() {
    if (this.weekSettings) {
      return this.weekSettings;
    } else if (!hasLocaleWeekInfo()) {
      return fallbackWeekSettings;
    } else {
      return getCachedWeekInfo(this.locale);
    }
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  }
  toString() {
    return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
  }
};

// node_modules/luxon/src/zones/fixedOffsetZone.js
var singleton2 = null;
var FixedOffsetZone = class _FixedOffsetZone extends Zone {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    if (singleton2 === null) {
      singleton2 = new _FixedOffsetZone(0);
    }
    return singleton2;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(offset2) {
    return offset2 === 0 ? _FixedOffsetZone.utcInstance : new _FixedOffsetZone(offset2);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(s2) {
    if (s2) {
      const r = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r) {
        return new _FixedOffsetZone(signedOffset(r[1], r[2]));
      }
    }
    return null;
  }
  constructor(offset2) {
    super();
    this.fixed = offset2;
  }
  /**
   * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
   * @override
   * @type {string}
   */
  get type() {
    return "fixed";
  }
  /**
   * The name of this zone.
   * All fixed zones' names always start with "UTC" (plus optional offset)
   * @override
   * @type {string}
   */
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
  }
  /**
   * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
   *
   * @override
   * @type {string}
   */
  get ianaName() {
    if (this.fixed === 0) {
      return "Etc/UTC";
    } else {
      return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
    }
  }
  /**
   * Returns the offset's common name at the specified timestamp.
   *
   * For fixed offset zones this equals to the zone name.
   * @override
   */
  offsetName() {
    return this.name;
  }
  /**
   * Returns the offset's value as a string
   * @override
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    return formatOffset(this.fixed, format);
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year:
   * Always returns true for all fixed offset zones.
   * @override
   * @type {boolean}
   */
  get isUniversal() {
    return true;
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   *
   * For fixed offset zones, this is constant and does not depend on a timestamp.
   * @override
   * @return {number}
   */
  offset() {
    return this.fixed;
  }
  /**
   * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
   * @override
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }
  /**
   * Return whether this Zone is valid:
   * All fixed offset zones are valid.
   * @override
   * @type {boolean}
   */
  get isValid() {
    return true;
  }
};

// node_modules/luxon/src/zones/invalidZone.js
var InvalidZone = class extends Zone {
  constructor(zoneName) {
    super();
    this.zoneName = zoneName;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return false;
  }
  /** @override **/
  get isValid() {
    return false;
  }
};

// node_modules/luxon/src/impl/zoneUtil.js
function normalizeZone(input, defaultZone2) {
  let offset2;
  if (isUndefined(input) || input === null) {
    return defaultZone2;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    const lowered = input.toLowerCase();
    if (lowered === "default") return defaultZone2;
    else if (lowered === "local" || lowered === "system") return SystemZone.instance;
    else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
    else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && "offset" in input && typeof input.offset === "function") {
    return input;
  } else {
    return new InvalidZone(input);
  }
}

// node_modules/luxon/src/impl/digits.js
var numberingSystems = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
};
var numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};
var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  let value = parseInt(str, 10);
  if (isNaN(value)) {
    value = "";
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (const key in numberingSystemsUTF16) {
          const [min, max] = numberingSystemsUTF16[key];
          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }
    return parseInt(value, 10);
  } else {
    return value;
  }
}
var digitRegexCache = /* @__PURE__ */ new Map();
function resetDigitRegexCache() {
  digitRegexCache.clear();
}
function digitRegex({ numberingSystem }, append = "") {
  const ns = numberingSystem || "latn";
  let appendCache = digitRegexCache.get(ns);
  if (appendCache === void 0) {
    appendCache = /* @__PURE__ */ new Map();
    digitRegexCache.set(ns, appendCache);
  }
  let regex = appendCache.get(append);
  if (regex === void 0) {
    regex = new RegExp(`${numberingSystems[ns]}${append}`);
    appendCache.set(append, regex);
  }
  return regex;
}

// node_modules/luxon/src/settings.js
var now = () => Date.now();
var defaultZone = "system";
var defaultLocale = null;
var defaultNumberingSystem = null;
var defaultOutputCalendar = null;
var twoDigitCutoffYear = 60;
var throwOnInvalid;
var defaultWeekSettings = null;
var Settings = class {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return now;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(n2) {
    now = n2;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(zone) {
    defaultZone = zone;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return normalizeZone(defaultZone, SystemZone.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return defaultLocale;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(locale) {
    defaultLocale = locale;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return defaultNumberingSystem;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(numberingSystem) {
    defaultNumberingSystem = numberingSystem;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return defaultOutputCalendar;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(outputCalendar) {
    defaultOutputCalendar = outputCalendar;
  }
  /**
   * @typedef {Object} WeekSettings
   * @property {number} firstDay
   * @property {number} minimalDays
   * @property {number[]} weekend
   */
  /**
   * @return {WeekSettings|null}
   */
  static get defaultWeekSettings() {
    return defaultWeekSettings;
  }
  /**
   * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
   * how many days are required in the first week of a year.
   * Does not affect existing instances.
   *
   * @param {WeekSettings|null} weekSettings
   */
  static set defaultWeekSettings(weekSettings) {
    defaultWeekSettings = validateWeekSettings(weekSettings);
  }
  /**
   * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return twoDigitCutoffYear;
  }
  /**
   * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
   * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
   * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
   */
  static set twoDigitCutoffYear(cutoffYear) {
    twoDigitCutoffYear = cutoffYear % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return throwOnInvalid;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t) {
    throwOnInvalid = t;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
    DateTime.resetCache();
    resetDigitRegexCache();
  }
};

// node_modules/luxon/src/impl/invalid.js
var Invalid = class {
  constructor(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }
  toMessage() {
    if (this.explanation) {
      return `${this.reason}: ${this.explanation}`;
    } else {
      return this.reason;
    }
  }
};

// node_modules/luxon/src/impl/conversions.js
var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function unitOutOfRange(unit, value) {
  return new Invalid(
    "unit out of range",
    `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
  );
}
function dayOfWeek(year, month, day) {
  const d = new Date(Date.UTC(year, month - 1, day));
  if (year < 100 && year >= 0) {
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }
  const js = d.getUTCDay();
  return js === 0 ? 7 : js;
}
function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
  const table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex((i) => i < ordinal), day = ordinal - table[month0];
  return { month: month0 + 1, day };
}
function isoWeekdayToLocal(isoWeekday, startOfWeek) {
  return (isoWeekday - startOfWeek + 7) % 7 + 1;
}
function gregorianToWeek(gregObj, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const { year, month, day } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = isoWeekdayToLocal(dayOfWeek(year, month, day), startOfWeek);
  let weekNumber = Math.floor((ordinal - weekday + 14 - minDaysInFirstWeek) / 7), weekYear;
  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear, minDaysInFirstWeek, startOfWeek);
  } else if (weekNumber > weeksInWeekYear(year, minDaysInFirstWeek, startOfWeek)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }
  return __spreadValues({ weekYear, weekNumber, weekday }, timeObject(gregObj));
}
function weekToGregorian(weekData, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const { weekYear, weekNumber, weekday } = weekData, weekdayOfJan4 = isoWeekdayToLocal(dayOfWeek(weekYear, 1, minDaysInFirstWeek), startOfWeek), yearInDays = daysInYear(weekYear);
  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 7 + minDaysInFirstWeek, year;
  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return __spreadValues({ year, month, day }, timeObject(weekData));
}
function gregorianToOrdinal(gregData) {
  const { year, month, day } = gregData;
  const ordinal = computeOrdinal(year, month, day);
  return __spreadValues({ year, ordinal }, timeObject(gregData));
}
function ordinalToGregorian(ordinalData) {
  const { year, ordinal } = ordinalData;
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return __spreadValues({ year, month, day }, timeObject(ordinalData));
}
function usesLocalWeekValues(obj, loc) {
  const hasLocaleWeekData = !isUndefined(obj.localWeekday) || !isUndefined(obj.localWeekNumber) || !isUndefined(obj.localWeekYear);
  if (hasLocaleWeekData) {
    const hasIsoWeekData = !isUndefined(obj.weekday) || !isUndefined(obj.weekNumber) || !isUndefined(obj.weekYear);
    if (hasIsoWeekData) {
      throw new ConflictingSpecificationError(
        "Cannot mix locale-based week fields with ISO-based week fields"
      );
    }
    if (!isUndefined(obj.localWeekday)) obj.weekday = obj.localWeekday;
    if (!isUndefined(obj.localWeekNumber)) obj.weekNumber = obj.localWeekNumber;
    if (!isUndefined(obj.localWeekYear)) obj.weekYear = obj.localWeekYear;
    delete obj.localWeekday;
    delete obj.localWeekNumber;
    delete obj.localWeekYear;
    return {
      minDaysInFirstWeek: loc.getMinDaysInFirstWeek(),
      startOfWeek: loc.getStartOfWeek()
    };
  } else {
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
  }
}
function hasInvalidWeekData(obj, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const validYear = isInteger(obj.weekYear), validWeek = integerBetween(
    obj.weekNumber,
    1,
    weeksInWeekYear(obj.weekYear, minDaysInFirstWeek, startOfWeek)
  ), validWeekday = integerBetween(obj.weekday, 1, 7);
  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.weekNumber);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else return false;
}
function hasInvalidOrdinalData(obj) {
  const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else return false;
}
function hasInvalidGregorianData(obj) {
  const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else return false;
}
function hasInvalidTimeData(obj) {
  const { hour, minute, second, millisecond } = obj;
  const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else return false;
}

// node_modules/luxon/src/impl/util.js
function isUndefined(o) {
  return typeof o === "undefined";
}
function isNumber(o) {
  return typeof o === "number";
}
function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}
function isString(o) {
  return typeof o === "string";
}
function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}
function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
}
function hasLocaleWeekInfo() {
  try {
    return typeof Intl !== "undefined" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
  } catch (e) {
    return false;
  }
}
function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return void 0;
  }
  return arr.reduce((best, next) => {
    const pair = [by(next), next];
    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}
function pick(obj, keys) {
  return keys.reduce((a, k) => {
    a[k] = obj[k];
    return a;
  }, {});
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function validateWeekSettings(settings) {
  if (settings == null) {
    return null;
  } else if (typeof settings !== "object") {
    throw new InvalidArgumentError("Week settings must be an object");
  } else {
    if (!integerBetween(settings.firstDay, 1, 7) || !integerBetween(settings.minimalDays, 1, 7) || !Array.isArray(settings.weekend) || settings.weekend.some((v) => !integerBetween(v, 1, 7))) {
      throw new InvalidArgumentError("Invalid week settings");
    }
    return {
      firstDay: settings.firstDay,
      minimalDays: settings.minimalDays,
      weekend: Array.from(settings.weekend)
    };
  }
}
function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}
function floorMod(x, n2) {
  return x - n2 * Math.floor(x / n2);
}
function padStart(input, n2 = 2) {
  const isNeg = input < 0;
  let padded;
  if (isNeg) {
    padded = "-" + ("" + -input).padStart(n2, "0");
  } else {
    padded = ("" + input).padStart(n2, "0");
  }
  return padded;
}
function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseInt(string, 10);
  }
}
function parseFloating(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseFloat(string);
  }
}
function parseMillis(fraction) {
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return void 0;
  } else {
    const f = parseFloat("0." + fraction) * 1e3;
    return Math.floor(f);
  }
}
function roundTo(number, digits, rounding = "round") {
  const factor = 10 ** digits;
  switch (rounding) {
    case "expand":
      return number > 0 ? Math.ceil(number * factor) / factor : Math.floor(number * factor) / factor;
    case "trunc":
      return Math.trunc(number * factor) / factor;
    case "round":
      return Math.round(number * factor) / factor;
    case "floor":
      return Math.floor(number * factor) / factor;
    case "ceil":
      return Math.ceil(number * factor) / factor;
    default:
      throw new RangeError(`Value rounding ${rounding} is out of range`);
  }
}
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
}
function objToLocalTS(obj) {
  let d = Date.UTC(
    obj.year,
    obj.month - 1,
    obj.day,
    obj.hour,
    obj.minute,
    obj.second,
    obj.millisecond
  );
  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(obj.year, obj.month - 1, obj.day);
  }
  return +d;
}
function firstWeekOffset(year, minDaysInFirstWeek, startOfWeek) {
  const fwdlw = isoWeekdayToLocal(dayOfWeek(year, 1, minDaysInFirstWeek), startOfWeek);
  return -fwdlw + minDaysInFirstWeek - 1;
}
function weeksInWeekYear(weekYear, minDaysInFirstWeek = 4, startOfWeek = 1) {
  const weekOffset = firstWeekOffset(weekYear, minDaysInFirstWeek, startOfWeek);
  const weekOffsetNext = firstWeekOffset(weekYear + 1, minDaysInFirstWeek, startOfWeek);
  return (daysInYear(weekYear) - weekOffset + weekOffsetNext) / 7;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else return year > Settings.twoDigitCutoffYear ? 1900 + year : 2e3 + year;
}
function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
  const date = new Date(ts), intlOpts = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }
  const modified = __spreadValues({ timeZoneName: offsetFormat }, intlOpts);
  const parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find((m) => m.type.toLowerCase() === "timezonename");
  return parsed ? parsed.value : null;
}
function signedOffset(offHourStr, offMinuteStr) {
  let offHour = parseInt(offHourStr, 10);
  if (Number.isNaN(offHour)) {
    offHour = 0;
  }
  const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}
function asNumber(value) {
  const numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || !Number.isFinite(numericValue))
    throw new InvalidArgumentError(`Invalid unit value ${value}`);
  return numericValue;
}
function normalizeObject(obj, normalizer) {
  const normalized = {};
  for (const u in obj) {
    if (hasOwnProperty(obj, u)) {
      const v = obj[u];
      if (v === void 0 || v === null) continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }
  return normalized;
}
function formatOffset(offset2, format) {
  const hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
  switch (format) {
    case "short":
      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
    case "narrow":
      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
    case "techie":
      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
    default:
      throw new RangeError(`Value format ${format} is out of range for property format`);
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}

// node_modules/luxon/src/impl/english.js
var monthsLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [...monthsNarrow];
    case "short":
      return [...monthsShort];
    case "long":
      return [...monthsLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
var weekdaysLong = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [...weekdaysNarrow];
    case "short":
      return [...weekdaysShort];
    case "long":
      return [...weekdaysLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
var meridiems = ["AM", "PM"];
var erasLong = ["Before Christ", "Anno Domini"];
var erasShort = ["BC", "AD"];
var erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [...erasNarrow];
    case "short":
      return [...erasShort];
    case "long":
      return [...erasLong];
    default:
      return null;
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
  const units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };
  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
  if (numeric === "auto" && lastable) {
    const isDay = unit === "days";
    switch (count) {
      case 1:
        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
      case -1:
        return isDay ? "yesterday" : `last ${units[unit][0]}`;
      case 0:
        return isDay ? "today" : `this ${units[unit][0]}`;
      default:
    }
  }
  const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
}

// node_modules/luxon/src/impl/formatter.js
function stringifyTokens(splits, tokenToString) {
  let s2 = "";
  for (const token of splits) {
    if (token.literal) {
      s2 += token.val;
    } else {
      s2 += tokenToString(token.val);
    }
  }
  return s2;
}
var macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
};
var Formatter = class _Formatter {
  static create(locale, opts = {}) {
    return new _Formatter(locale, opts);
  }
  static parseFormat(fmt) {
    let current = null, currentFull = "", bracketed = false;
    const splits = [];
    for (let i = 0; i < fmt.length; i++) {
      const c = fmt.charAt(i);
      if (c === "'") {
        if (currentFull.length > 0 || bracketed) {
          splits.push({
            literal: bracketed || /^\s+$/.test(currentFull),
            val: currentFull === "" ? "'" : currentFull
          });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: /^\s+$/.test(currentFull), val: currentFull });
        }
        currentFull = c;
        current = c;
      }
    }
    if (currentFull.length > 0) {
      splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
    }
    return splits;
  }
  static macroTokenToFormatOpts(token) {
    return macroTokenToFormatOpts[token];
  }
  constructor(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }
  formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }
    const df = this.systemLoc.dtFormatter(dt, __spreadValues(__spreadValues({}, this.opts), opts));
    return df.format();
  }
  dtFormatter(dt, opts = {}) {
    return this.loc.dtFormatter(dt, __spreadValues(__spreadValues({}, this.opts), opts));
  }
  formatDateTime(dt, opts) {
    return this.dtFormatter(dt, opts).format();
  }
  formatDateTimeParts(dt, opts) {
    return this.dtFormatter(dt, opts).formatToParts();
  }
  formatInterval(interval, opts) {
    const df = this.dtFormatter(interval.start, opts);
    return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
  }
  resolvedOptions(dt, opts) {
    return this.dtFormatter(dt, opts).resolvedOptions();
  }
  num(n2, p = 0, signDisplay = void 0) {
    if (this.opts.forceSimple) {
      return padStart(n2, p);
    }
    const opts = __spreadValues({}, this.opts);
    if (p > 0) {
      opts.padTo = p;
    }
    if (signDisplay) {
      opts.signDisplay = signDisplay;
    }
    return this.loc.numberFormatter(opts).format(n2);
  }
  formatDateTimeFromString(dt, fmt) {
    const knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset2 = (opts) => {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }
      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    }, meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"), weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string(
      standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
      "weekday"
    ), maybeMacro = (token) => {
      const formatOpts = _Formatter.macroTokenToFormatOpts(token);
      if (formatOpts) {
        return this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"), tokenToString = (token) => {
      switch (token) {
        // ms
        case "S":
          return this.num(dt.millisecond);
        case "u":
        // falls through
        case "SSS":
          return this.num(dt.millisecond, 3);
        // seconds
        case "s":
          return this.num(dt.second);
        case "ss":
          return this.num(dt.second, 2);
        // fractional seconds
        case "uu":
          return this.num(Math.floor(dt.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(dt.millisecond / 100));
        // minutes
        case "m":
          return this.num(dt.minute);
        case "mm":
          return this.num(dt.minute, 2);
        // hours
        case "h":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
        case "hh":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
        case "H":
          return this.num(dt.hour);
        case "HH":
          return this.num(dt.hour, 2);
        // offset
        case "Z":
          return formatOffset2({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return formatOffset2({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return formatOffset2({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
        // zone
        case "z":
          return dt.zoneName;
        // meridiems
        case "a":
          return meridiem();
        // dates
        case "d":
          return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
        case "dd":
          return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
        // weekdays - standalone
        case "c":
          return this.num(dt.weekday);
        case "ccc":
          return weekday("short", true);
        case "cccc":
          return weekday("long", true);
        case "ccccc":
          return weekday("narrow", true);
        // weekdays - format
        case "E":
          return this.num(dt.weekday);
        case "EEE":
          return weekday("short", false);
        case "EEEE":
          return weekday("long", false);
        case "EEEEE":
          return weekday("narrow", false);
        // months - standalone
        case "L":
          return useDateTimeFormatter ? string({ month: "numeric", day: "numeric" }, "month") : this.num(dt.month);
        case "LL":
          return useDateTimeFormatter ? string({ month: "2-digit", day: "numeric" }, "month") : this.num(dt.month, 2);
        case "LLL":
          return month("short", true);
        case "LLLL":
          return month("long", true);
        case "LLLLL":
          return month("narrow", true);
        // months - format
        case "M":
          return useDateTimeFormatter ? string({ month: "numeric" }, "month") : this.num(dt.month);
        case "MM":
          return useDateTimeFormatter ? string({ month: "2-digit" }, "month") : this.num(dt.month, 2);
        case "MMM":
          return month("short", false);
        case "MMMM":
          return month("long", false);
        case "MMMMM":
          return month("narrow", false);
        // years
        case "y":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
        case "yy":
          return useDateTimeFormatter ? string({ year: "2-digit" }, "year") : this.num(dt.year.toString().slice(-2), 2);
        case "yyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 4);
        case "yyyyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 6);
        // eras
        case "G":
          return era("short");
        case "GG":
          return era("long");
        case "GGGGG":
          return era("narrow");
        case "kk":
          return this.num(dt.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(dt.weekYear, 4);
        case "W":
          return this.num(dt.weekNumber);
        case "WW":
          return this.num(dt.weekNumber, 2);
        case "n":
          return this.num(dt.localWeekNumber);
        case "nn":
          return this.num(dt.localWeekNumber, 2);
        case "ii":
          return this.num(dt.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(dt.localWeekYear, 4);
        case "o":
          return this.num(dt.ordinal);
        case "ooo":
          return this.num(dt.ordinal, 3);
        case "q":
          return this.num(dt.quarter);
        case "qq":
          return this.num(dt.quarter, 2);
        case "X":
          return this.num(Math.floor(dt.ts / 1e3));
        case "x":
          return this.num(dt.ts);
        default:
          return maybeMacro(token);
      }
    };
    return stringifyTokens(_Formatter.parseFormat(fmt), tokenToString);
  }
  formatDurationFromString(dur, fmt) {
    const invertLargest = this.opts.signMode === "negativeLargestOnly" ? -1 : 1;
    const tokenToField = (token) => {
      switch (token[0]) {
        case "S":
          return "milliseconds";
        case "s":
          return "seconds";
        case "m":
          return "minutes";
        case "h":
          return "hours";
        case "d":
          return "days";
        case "w":
          return "weeks";
        case "M":
          return "months";
        case "y":
          return "years";
        default:
          return null;
      }
    }, tokenToString = (lildur, info) => (token) => {
      const mapped = tokenToField(token);
      if (mapped) {
        const inversionFactor = info.isNegativeDuration && mapped !== info.largestUnit ? invertLargest : 1;
        let signDisplay;
        if (this.opts.signMode === "negativeLargestOnly" && mapped !== info.largestUnit) {
          signDisplay = "never";
        } else if (this.opts.signMode === "all") {
          signDisplay = "always";
        } else {
          signDisplay = "auto";
        }
        return this.num(lildur.get(mapped) * inversionFactor, token.length, signDisplay);
      } else {
        return token;
      }
    }, tokens = _Formatter.parseFormat(fmt), realTokens = tokens.reduce(
      (found, { literal, val }) => literal ? found : found.concat(val),
      []
    ), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => t)), durationInfo = {
      isNegativeDuration: collapsed < 0,
      // this relies on "collapsed" being based on "shiftTo", which builds up the object
      // in order
      largestUnit: Object.keys(collapsed.values)[0]
    };
    return stringifyTokens(tokens, tokenToString(collapsed, durationInfo));
  }
};

// node_modules/luxon/src/impl/regexParser.js
var ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function combineRegexes(...regexes) {
  const full = regexes.reduce((f, r) => f + r.source, "");
  return RegExp(`^${full}$`);
}
function combineExtractors(...extractors) {
  return (m) => extractors.reduce(
    ([mergedVals, mergedZone, cursor], ex) => {
      const [val, zone, next] = ex(m, cursor);
      return [__spreadValues(__spreadValues({}, mergedVals), val), zone || mergedZone, next];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function parse(s2, ...patterns) {
  if (s2 == null) {
    return [null, null];
  }
  for (const [regex, extractor] of patterns) {
    const m = regex.exec(s2);
    if (m) {
      return extractor(m);
    }
  }
  return [null, null];
}
function simpleParse(...keys) {
  return (match2, cursor) => {
    const ret = {};
    let i;
    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match2[cursor + i]);
    }
    return [ret, null, cursor + i];
  };
}
var offsetRegex = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/;
var isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
var isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
var isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
var isoTimeExtensionRegex = RegExp(`(?:[Tt]${isoTimeRegex.source})?`);
var isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
var isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
var isoOrdinalRegex = /(\d{4})-?(\d{3})/;
var extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
var extractISOOrdinalData = simpleParse("year", "ordinal");
var sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
var sqlTimeRegex = RegExp(
  `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`
);
var sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
function int(match2, pos, fallback) {
  const m = match2[pos];
  return isUndefined(m) ? fallback : parseInteger(m);
}
function extractISOYmd(match2, cursor) {
  const item = {
    year: int(match2, cursor),
    month: int(match2, cursor + 1, 1),
    day: int(match2, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}
function extractISOTime(match2, cursor) {
  const item = {
    hours: int(match2, cursor, 0),
    minutes: int(match2, cursor + 1, 0),
    seconds: int(match2, cursor + 2, 0),
    milliseconds: parseMillis(match2[cursor + 3])
  };
  return [item, null, cursor + 4];
}
function extractISOOffset(match2, cursor) {
  const local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}
function extractIANAZone(match2, cursor) {
  const zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
  return [{}, zone, cursor + 1];
}
var isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
var isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function extractISODuration(match2) {
  const [s2, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match2;
  const hasNegativePrefix = s2[0] === "-";
  const negativeSeconds = secondStr && secondStr[0] === "-";
  const maybeNegate = (num, force = false) => num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
  return [
    {
      years: maybeNegate(parseFloating(yearStr)),
      months: maybeNegate(parseFloating(monthStr)),
      weeks: maybeNegate(parseFloating(weekStr)),
      days: maybeNegate(parseFloating(dayStr)),
      hours: maybeNegate(parseFloating(hourStr)),
      minutes: maybeNegate(parseFloating(minuteStr)),
      seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
      milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
    }
  ];
}
var obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  const result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr)
  };
  if (secondStr) result.second = parseInteger(secondStr);
  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }
  return result;
}
var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match2) {
  const [
    ,
    weekdayStr,
    dayStr,
    monthStr,
    yearStr,
    hourStr,
    minuteStr,
    secondStr,
    obsOffset,
    milOffset,
    offHourStr,
    offMinuteStr
  ] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  let offset2;
  if (obsOffset) {
    offset2 = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset2 = 0;
  } else {
    offset2 = signedOffset(offHourStr, offMinuteStr);
  }
  return [result, new FixedOffsetZone(offset2)];
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/;
var rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/;
var ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match2) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
function extractASCII(match2) {
  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
var extractISOYmdTimeAndOffset = combineExtractors(
  extractISOYmd,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
var extractISOWeekTimeAndOffset = combineExtractors(
  extractISOWeekData,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
var extractISOOrdinalDateAndTime = combineExtractors(
  extractISOOrdinalData,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
var extractISOTimeAndOffset = combineExtractors(
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
function parseISODate(s2) {
  return parse(
    s2,
    [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
    [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
    [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime],
    [isoTimeCombinedRegex, extractISOTimeAndOffset]
  );
}
function parseRFC2822Date(s2) {
  return parse(preprocessRFC2822(s2), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s2) {
  return parse(
    s2,
    [rfc1123, extractRFC1123Or850],
    [rfc850, extractRFC1123Or850],
    [ascii, extractASCII]
  );
}
function parseISODuration(s2) {
  return parse(s2, [isoDuration, extractISODuration]);
}
var extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s2) {
  return parse(s2, [isoTimeOnly, extractISOTimeOnly]);
}
var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
var extractISOTimeOffsetAndIANAZone = combineExtractors(
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
function parseSQL(s2) {
  return parse(
    s2,
    [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
    [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
  );
}

// node_modules/luxon/src/duration.js
var INVALID = "Invalid Duration";
var lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
};
var casualMatrix = __spreadValues({
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  }
}, lowOrderMatrix);
var daysInYearAccurate = 146097 / 400;
var daysInMonthAccurate = 146097 / 4800;
var accurateMatrix = __spreadValues({
  years: {
    quarters: 4,
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
  }
}, lowOrderMatrix);
var orderedUnits = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
];
var reverseUnits = orderedUnits.slice(0).reverse();
function clone(dur, alts, clear = false) {
  const conf = {
    values: clear ? alts.values : __spreadValues(__spreadValues({}, dur.values), alts.values || {}),
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
    matrix: alts.matrix || dur.matrix
  };
  return new Duration(conf);
}
function durationToMillis(matrix, vals) {
  let sum = vals.milliseconds ?? 0;
  for (const unit of reverseUnits.slice(1)) {
    if (vals[unit]) {
      sum += vals[unit] * matrix[unit]["milliseconds"];
    }
  }
  return sum;
}
function normalizeValues(matrix, vals) {
  const factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;
  orderedUnits.reduceRight((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        const previousVal = vals[previous] * factor;
        const conv = matrix[current][previous];
        const rollUp = Math.floor(previousVal / conv);
        vals[current] += rollUp * factor;
        vals[previous] -= rollUp * conv * factor;
      }
      return current;
    } else {
      return previous;
    }
  }, null);
  orderedUnits.reduce((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        const fraction = vals[previous] % 1;
        vals[previous] -= fraction;
        vals[current] += fraction * matrix[previous][current];
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}
function removeZeroes(vals) {
  const newVals = {};
  for (const [key, value] of Object.entries(vals)) {
    if (value !== 0) {
      newVals[key] = value;
    }
  }
  return newVals;
}
var Duration = class _Duration {
  /**
   * @private
   */
  constructor(config) {
    const accurate = config.conversionAccuracy === "longterm" || false;
    let matrix = accurate ? accurateMatrix : casualMatrix;
    if (config.matrix) {
      matrix = config.matrix;
    }
    this.values = config.values;
    this.loc = config.loc || Locale.create();
    this.conversionAccuracy = accurate ? "longterm" : "casual";
    this.invalid = config.invalid || null;
    this.matrix = matrix;
    this.isLuxonDuration = true;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(count, opts) {
    return _Duration.fromObject({ milliseconds: count }, opts);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(obj, opts = {}) {
    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError(
        `Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`
      );
    }
    return new _Duration({
      values: normalizeObject(obj, _Duration.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy,
      matrix: opts.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(durationLike) {
    if (isNumber(durationLike)) {
      return _Duration.fromMillis(durationLike);
    } else if (_Duration.isDuration(durationLike)) {
      return durationLike;
    } else if (typeof durationLike === "object") {
      return _Duration.fromObject(durationLike);
    } else {
      throw new InvalidArgumentError(
        `Unknown duration argument ${durationLike} of type ${typeof durationLike}`
      );
    }
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(text, opts) {
    const [parsed] = parseISODuration(text);
    if (parsed) {
      return _Duration.fromObject(parsed, opts);
    } else {
      return _Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(text, opts) {
    const [parsed] = parseISOTimeOnly(text);
    if (parsed) {
      return _Duration.fromObject(parsed, opts);
    } else {
      return _Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new _Duration({ invalid });
    }
  }
  /**
   * @private
   */
  static normalizeUnit(unit) {
    const normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];
    if (!normalized) throw new InvalidUnitError(unit);
    return normalized;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(o) {
    return o && o.isLuxonDuration || false;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @param {'negative'|'all'|'negativeLargestOnly'} [opts.signMode=negative] - How to handle signs
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @example Duration.fromObject({ days: 6, seconds: 2 }).toFormat("d s", { signMode: "all" }) //=> "+6 +2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "all" }) //=> "-6 -2"
   * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "negativeLargestOnly" }) //=> "-6 2"
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    const fmtOpts = __spreadProps(__spreadValues({}, opts), {
      floor: opts.round !== false && opts.floor !== false
    });
    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
   * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
   * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
   * @param {boolean} [opts.showZeros=true] - Show all units previously used by the duration even if they are zero
   * @example
   * ```js
   * var dur = Duration.fromObject({ months: 1, weeks: 0, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 month, 0 weeks, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 month, 0 weeks, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 mth, 0 wks, 5 hr, 6 min'
   * dur.toHuman({ showZeros: false }) //=> '1 month, 5 hours, 6 minutes'
   * ```
   */
  toHuman(opts = {}) {
    if (!this.isValid) return INVALID;
    const showZeros = opts.showZeros !== false;
    const l2 = orderedUnits.map((unit) => {
      const val = this.values[unit];
      if (isUndefined(val) || val === 0 && !showZeros) {
        return null;
      }
      return this.loc.numberFormatter(__spreadProps(__spreadValues({ style: "unit", unitDisplay: "long" }, opts), { unit: unit.slice(0, -1) })).format(val);
    }).filter((n2) => n2);
    return this.loc.listFormatter(__spreadValues({ type: "conjunction", style: opts.listStyle || "narrow" }, opts)).format(l2);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    if (!this.isValid) return {};
    return __spreadValues({}, this.values);
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid) return null;
    let s2 = "P";
    if (this.years !== 0) s2 += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0) s2 += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0) s2 += this.weeks + "W";
    if (this.days !== 0) s2 += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
      s2 += "T";
    if (this.hours !== 0) s2 += this.hours + "H";
    if (this.minutes !== 0) s2 += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0)
      s2 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
    if (s2 === "P") s2 += "T0S";
    return s2;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(opts = {}) {
    if (!this.isValid) return null;
    const millis = this.toMillis();
    if (millis < 0 || millis >= 864e5) return null;
    opts = __spreadProps(__spreadValues({
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended"
    }, opts), {
      includeOffset: false
    });
    const dateTime = DateTime.fromMillis(millis, { zone: "UTC" });
    return dateTime.toISOTime(opts);
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns a string representation of this Duration appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `Duration { values: ${JSON.stringify(this.values)} }`;
    } else {
      return `Duration { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    if (!this.isValid) return NaN;
    return durationToMillis(this.matrix, this.values);
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(duration) {
    if (!this.isValid) return this;
    const dur = _Duration.fromDurationLike(duration), result = {};
    for (const k of orderedUnits) {
      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }
    return clone(this, { values: result }, true);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(duration) {
    if (!this.isValid) return this;
    const dur = _Duration.fromDurationLike(duration);
    return this.plus(dur.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(fn) {
    if (!this.isValid) return this;
    const result = {};
    for (const k of Object.keys(this.values)) {
      result[k] = asNumber(fn(this.values[k], k));
    }
    return clone(this, { values: result }, true);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(unit) {
    return this[_Duration.normalizeUnit(unit)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(values) {
    if (!this.isValid) return this;
    const mixed = __spreadValues(__spreadValues({}, this.values), normalizeObject(values, _Duration.normalizeUnit));
    return clone(this, { values: mixed });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale, numberingSystem, conversionAccuracy, matrix } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem });
    const opts = { loc, matrix, conversionAccuracy };
    return clone(this, opts);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * Assuming the overall value of the Duration is positive, this means:
   * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
   * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
   *   the overall value would be negative, see third example)
   * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
   *
   * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;
    const vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone(this, { values: vals }, true);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid) return this;
    const vals = removeZeroes(this.normalize().shiftToAll().toObject());
    return clone(this, { values: vals }, true);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...units) {
    if (!this.isValid) return this;
    if (units.length === 0) {
      return this;
    }
    units = units.map((u) => _Duration.normalizeUnit(u));
    const built = {}, accumulated = {}, vals = this.toObject();
    let lastUnit;
    for (const k of orderedUnits) {
      if (units.indexOf(k) >= 0) {
        lastUnit = k;
        let own = 0;
        for (const ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        }
        if (isNumber(vals[k])) {
          own += vals[k];
        }
        const i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = (own * 1e3 - i * 1e3) / 1e3;
      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    }
    for (const key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }
    normalizeValues(this.matrix, built);
    return clone(this, { values: built }, true);
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    if (!this.isValid) return this;
    return this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    );
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const negated = {};
    for (const k of Object.keys(this.values)) {
      negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
    }
    return clone(this, { values: negated }, true);
  }
  /**
   * Removes all units with values equal to 0 from this Duration.
   * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
   * @return {Duration}
   */
  removeZeros() {
    if (!this.isValid) return this;
    const vals = removeZeroes(this.values);
    return clone(this, { values: vals }, true);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    if (!this.loc.equals(other.loc)) {
      return false;
    }
    function eq(v1, v2) {
      if (v1 === void 0 || v1 === 0) return v2 === void 0 || v2 === 0;
      return v1 === v2;
    }
    for (const u of orderedUnits) {
      if (!eq(this.values[u], other.values[u])) {
        return false;
      }
    }
    return true;
  }
};

// node_modules/luxon/src/interval.js
var INVALID2 = "Invalid Interval";
function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid(
      "end before start",
      `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
    );
  } else {
    return null;
  }
}
var Interval = class _Interval {
  /**
   * @private
   */
  constructor(config) {
    this.s = config.start;
    this.e = config.end;
    this.invalid = config.invalid || null;
    this.isLuxonInterval = true;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new _Interval({ invalid });
    }
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(start, end) {
    const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
    const validateError = validateStartEnd(builtStart, builtEnd);
    if (validateError == null) {
      return new _Interval({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(start, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
    return _Interval.fromDateTimes(dt, dt.plus(dur));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(end, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
    return _Interval.fromDateTimes(dt.minus(dur), dt);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(text, opts) {
    const [s2, e] = (text || "").split("/", 2);
    if (s2 && e) {
      let start, startIsValid;
      try {
        start = DateTime.fromISO(s2, opts);
        startIsValid = start.isValid;
      } catch (e2) {
        startIsValid = false;
      }
      let end, endIsValid;
      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e2) {
        endIsValid = false;
      }
      if (startIsValid && endIsValid) {
        return _Interval.fromDateTimes(start, end);
      }
      if (startIsValid) {
        const dur = Duration.fromISO(e, opts);
        if (dur.isValid) {
          return _Interval.after(start, dur);
        }
      } else if (endIsValid) {
        const dur = Duration.fromISO(s2, opts);
        if (dur.isValid) {
          return _Interval.before(end, dur);
        }
      }
    }
    return _Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(o) {
    return o && o.isLuxonInterval || false;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval. This is the first instant which is not part of the interval
   * (Interval is half-open).
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns the last DateTime included in the interval (since end is not part of the interval)
   * @type {DateTime}
   */
  get lastDateTime() {
    return this.isValid ? this.e ? this.e.minus(1) : null : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(unit = "milliseconds") {
    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
   * @return {number}
   */
  count(unit = "milliseconds", opts) {
    if (!this.isValid) return NaN;
    const start = this.start.startOf(unit, opts);
    let end;
    if (opts?.useLocaleWeeks) {
      end = this.end.reconfigure({ locale: start.locale });
    } else {
      end = this.end;
    }
    end = end.startOf(unit, opts);
    return Math.floor(end.diff(start, unit).get(unit)) + (end.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(dateTime) {
    if (!this.isValid) return false;
    return this.s > dateTime;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(dateTime) {
    if (!this.isValid) return false;
    return this.e <= dateTime;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(dateTime) {
    if (!this.isValid) return false;
    return this.s <= dateTime && this.e > dateTime;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start, end } = {}) {
    if (!this.isValid) return this;
    return _Interval.fromDateTimes(start || this.s, end || this.e);
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...dateTimes) {
    if (!this.isValid) return [];
    const sorted = dateTimes.map(friendlyDateTime).filter((d) => this.contains(d)).sort((a, b) => a.toMillis() - b.toMillis()), results = [];
    let { s: s2 } = this, i = 0;
    while (s2 < this.e) {
      const added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
      results.push(_Interval.fromDateTimes(s2, next));
      s2 = next;
      i += 1;
    }
    return results;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(duration) {
    const dur = Duration.fromDurationLike(duration);
    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }
    let { s: s2 } = this, idx = 1, next;
    const results = [];
    while (s2 < this.e) {
      const added = this.start.plus(dur.mapUnits((x) => x * idx));
      next = +added > +this.e ? this.e : added;
      results.push(_Interval.fromDateTimes(s2, next));
      s2 = next;
      idx += 1;
    }
    return results;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(numberOfParts) {
    if (!this.isValid) return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(other) {
    if (!this.isValid) return false;
    return +this.e === +other.s;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(other) {
    if (!this.isValid) return false;
    return +other.e === +this.s;
  }
  /**
   * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(other) {
    if (!this.isValid) return false;
    return this.s <= other.s && this.e >= other.e;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    return this.s.equals(other.s) && this.e.equals(other.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(other) {
    if (!this.isValid) return this;
    const s2 = this.s > other.s ? this.s : other.s, e = this.e < other.e ? this.e : other.e;
    if (s2 >= e) {
      return null;
    } else {
      return _Interval.fromDateTimes(s2, e);
    }
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(other) {
    if (!this.isValid) return this;
    const s2 = this.s < other.s ? this.s : other.s, e = this.e > other.e ? this.e : other.e;
    return _Interval.fromDateTimes(s2, e);
  }
  /**
   * Merge an array of Intervals into an equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
   * and ending with the latest.
   *
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(intervals) {
    const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(
      ([sofar, current], item) => {
        if (!current) {
          return [sofar, item];
        } else if (current.overlaps(item) || current.abutsStart(item)) {
          return [sofar, current.union(item)];
        } else {
          return [sofar.concat([current]), item];
        }
      },
      [[], null]
    );
    if (final) {
      found.push(final);
    }
    return found;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(intervals) {
    let start = null, currentCount = 0;
    const results = [], ends = intervals.map((i) => [
      { time: i.s, type: "s" },
      { time: i.e, type: "e" }
    ]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => a.time - b.time);
    for (const i of arr) {
      currentCount += i.type === "s" ? 1 : -1;
      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(_Interval.fromDateTimes(start, i.time));
        }
        start = null;
      }
    }
    return _Interval.merge(results);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...intervals) {
    return _Interval.xor([this].concat(intervals)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    if (!this.isValid) return INVALID2;
    return `[${this.s.toISO()} – ${this.e.toISO()})`;
  }
  /**
   * Returns a string representation of this Interval appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`;
    } else {
      return `Interval { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this.s.loc.clone(opts), formatOpts).formatInterval(this) : INVALID2;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(opts) {
    if (!this.isValid) return INVALID2;
    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    if (!this.isValid) return INVALID2;
    return `${this.s.toISODate()}/${this.e.toISODate()}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(opts) {
    if (!this.isValid) return INVALID2;
    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(dateFormat, { separator = " – " } = {}) {
    if (!this.isValid) return INVALID2;
    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }
    return this.e.diff(this.s, unit, opts);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(mapFn) {
    return _Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  }
};

// node_modules/luxon/src/info.js
var Info = class {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(zone = Settings.defaultZone) {
    const proto = DateTime.now().setZone(zone).set({ month: 12 });
    return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(zone) {
    return IANAZone.isValidZone(zone);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(input) {
    return normalizeZone(input, Settings.defaultZone);
  }
  /**
   * Get the weekday on which the week starts according to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
   */
  static getStartOfWeek({ locale = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale)).getStartOfWeek();
  }
  /**
   * Get the minimum number of days necessary in a week before it is considered part of the next year according
   * to the given locale.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number}
   */
  static getMinimumDaysInFirstWeek({ locale = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale)).getMinDaysInFirstWeek();
  }
  /**
   * Get the weekdays, which are considered the weekend according to the given locale
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
   */
  static getWeekendWeekdays({ locale = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale)).getWeekendDays().slice();
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale = null } = {}) {
    return Locale.create(locale).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(length = "short", { locale = null } = {}) {
    return Locale.create(locale, null, "gregory").eras(length);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
   * @example Info.features() //=> { relative: false, localeWeek: true }
   * @return {Object}
   */
  static features() {
    return { relative: hasRelative(), localeWeek: hasLocaleWeekInfo() };
  }
};

// node_modules/luxon/src/impl/diff.js
function dayDiff(earlier, later) {
  const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(Duration.fromMillis(ms).as("days"));
}
function highOrderDiffs(cursor, later, units) {
  const differs = [
    ["years", (a, b) => b.year - a.year],
    ["quarters", (a, b) => b.quarter - a.quarter + (b.year - a.year) * 4],
    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
    [
      "weeks",
      (a, b) => {
        const days = dayDiff(a, b);
        return (days - days % 7) / 7;
      }
    ],
    ["days", dayDiff]
  ];
  const results = {};
  const earlier = cursor;
  let lowestOrder, highWater;
  for (const [unit, differ] of differs) {
    if (units.indexOf(unit) >= 0) {
      lowestOrder = unit;
      results[unit] = differ(cursor, later);
      highWater = earlier.plus(results);
      if (highWater > later) {
        results[unit]--;
        cursor = earlier.plus(results);
        if (cursor > later) {
          highWater = cursor;
          results[unit]--;
          cursor = earlier.plus(results);
        }
      } else {
        cursor = highWater;
      }
    }
  }
  return [cursor, results, highWater, lowestOrder];
}
function diff_default(earlier, later, units, opts) {
  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
  const remainingMillis = later - cursor;
  const lowerOrderUnits = units.filter(
    (u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0
  );
  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      highWater = cursor.plus({ [lowestOrder]: 1 });
    }
    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }
  const duration = Duration.fromObject(results, opts);
  if (lowerOrderUnits.length > 0) {
    return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
}

// node_modules/luxon/src/impl/tokenParser.js
var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
function intUnit(regex, post = (i) => i) {
  return { regex, deser: ([s2]) => post(parseDigits(s2)) };
}
var NBSP = String.fromCharCode(160);
var spaceOrNBSP = `[ ${NBSP}]`;
var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
function fixListRegex(s2) {
  return s2.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}
function stripInsensitivities(s2) {
  return s2.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
}
function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: ([s2]) => strings.findIndex((i) => stripInsensitivities(s2) === stripInsensitivities(i)) + startIndex
    };
  }
}
function offset(regex, groups) {
  return { regex, deser: ([, h, m]) => signedOffset(h, m), groups };
}
function simple(regex) {
  return { regex, deser: ([s2]) => s2 };
}
function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function unitForToken(token, loc) {
  const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t) => ({ regex: RegExp(escapeToken(t.val)), deser: ([s2]) => s2, literal: true }), unitate = (t) => {
    if (token.literal) {
      return literal(t);
    }
    switch (t.val) {
      // era
      case "G":
        return oneOf(loc.eras("short"), 0);
      case "GG":
        return oneOf(loc.eras("long"), 0);
      // years
      case "y":
        return intUnit(oneToSix);
      case "yy":
        return intUnit(twoToFour, untruncateYear);
      case "yyyy":
        return intUnit(four);
      case "yyyyy":
        return intUnit(fourToSix);
      case "yyyyyy":
        return intUnit(six);
      // months
      case "M":
        return intUnit(oneOrTwo);
      case "MM":
        return intUnit(two);
      case "MMM":
        return oneOf(loc.months("short", true), 1);
      case "MMMM":
        return oneOf(loc.months("long", true), 1);
      case "L":
        return intUnit(oneOrTwo);
      case "LL":
        return intUnit(two);
      case "LLL":
        return oneOf(loc.months("short", false), 1);
      case "LLLL":
        return oneOf(loc.months("long", false), 1);
      // dates
      case "d":
        return intUnit(oneOrTwo);
      case "dd":
        return intUnit(two);
      // ordinals
      case "o":
        return intUnit(oneToThree);
      case "ooo":
        return intUnit(three);
      // time
      case "HH":
        return intUnit(two);
      case "H":
        return intUnit(oneOrTwo);
      case "hh":
        return intUnit(two);
      case "h":
        return intUnit(oneOrTwo);
      case "mm":
        return intUnit(two);
      case "m":
        return intUnit(oneOrTwo);
      case "q":
        return intUnit(oneOrTwo);
      case "qq":
        return intUnit(two);
      case "s":
        return intUnit(oneOrTwo);
      case "ss":
        return intUnit(two);
      case "S":
        return intUnit(oneToThree);
      case "SSS":
        return intUnit(three);
      case "u":
        return simple(oneToNine);
      case "uu":
        return simple(oneOrTwo);
      case "uuu":
        return intUnit(one);
      // meridiem
      case "a":
        return oneOf(loc.meridiems(), 0);
      // weekYear (k)
      case "kkkk":
        return intUnit(four);
      case "kk":
        return intUnit(twoToFour, untruncateYear);
      // weekNumber (W)
      case "W":
        return intUnit(oneOrTwo);
      case "WW":
        return intUnit(two);
      // weekdays
      case "E":
      case "c":
        return intUnit(one);
      case "EEE":
        return oneOf(loc.weekdays("short", false), 1);
      case "EEEE":
        return oneOf(loc.weekdays("long", false), 1);
      case "ccc":
        return oneOf(loc.weekdays("short", true), 1);
      case "cccc":
        return oneOf(loc.weekdays("long", true), 1);
      // offset/zone
      case "Z":
      case "ZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
      case "ZZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
      // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
      // because we don't have any way to figure out what they are
      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);
      // this special-case "token" represents a place where a macro-token expanded into a white-space literal
      // in this case we accept any non-newline white-space
      case " ":
        return simple(/[^\S\n\r]/);
      default:
        return literal(t);
    }
  };
  const unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };
  unit.token = token;
  return unit;
}
var partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: {
    numeric: "h",
    "2-digit": "hh"
  },
  hour24: {
    numeric: "H",
    "2-digit": "HH"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function tokenForPart(part, formatOpts, resolvedOpts) {
  const { type, value } = part;
  if (type === "literal") {
    const isSpace = /^\s+$/.test(value);
    return {
      literal: !isSpace,
      val: isSpace ? " " : value
    };
  }
  const style2 = formatOpts[type];
  let actualType = type;
  if (type === "hour") {
    if (formatOpts.hour12 != null) {
      actualType = formatOpts.hour12 ? "hour12" : "hour24";
    } else if (formatOpts.hourCycle != null) {
      if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
        actualType = "hour12";
      } else {
        actualType = "hour24";
      }
    } else {
      actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
    }
  }
  let val = partTypeStyleToTokenVal[actualType];
  if (typeof val === "object") {
    val = val[style2];
  }
  if (val) {
    return {
      literal: false,
      val
    };
  }
  return void 0;
}
function buildRegex(units) {
  const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
  return [`^${re}$`, units];
}
function match(input, regex, handlers) {
  const matches = input.match(regex);
  if (matches) {
    const all = {};
    let matchIndex = 1;
    for (const i in handlers) {
      if (hasOwnProperty(handlers, i)) {
        const h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }
        matchIndex += groups;
      }
    }
    return [matches, all];
  } else {
    return [matches, {}];
  }
}
function dateTimeFromMatches(matches) {
  const toField = (token) => {
    switch (token) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let zone = null;
  let specificOffset;
  if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  }
  if (!isUndefined(matches.Z)) {
    if (!zone) {
      zone = new FixedOffsetZone(matches.Z);
    }
    specificOffset = matches.Z;
  }
  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }
  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }
  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }
  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }
  const vals = Object.keys(matches).reduce((r, k) => {
    const f = toField(k);
    if (f) {
      r[f] = matches[k];
    }
    return r;
  }, {});
  return [vals, zone, specificOffset];
}
var dummyDateTimeCache = null;
function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }
  return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }
  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
  const tokens = formatOptsToTokens(formatOpts, locale);
  if (tokens == null || tokens.includes(void 0)) {
    return token;
  }
  return tokens;
}
function expandMacroTokens(tokens, locale) {
  return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale)));
}
var TokenParser = class {
  constructor(locale, format) {
    this.locale = locale;
    this.format = format;
    this.tokens = expandMacroTokens(Formatter.parseFormat(format), locale);
    this.units = this.tokens.map((t) => unitForToken(t, locale));
    this.disqualifyingUnit = this.units.find((t) => t.invalidReason);
    if (!this.disqualifyingUnit) {
      const [regexString, handlers] = buildRegex(this.units);
      this.regex = RegExp(regexString, "i");
      this.handlers = handlers;
    }
  }
  explainFromTokens(input) {
    if (!this.isValid) {
      return { input, tokens: this.tokens, invalidReason: this.invalidReason };
    } else {
      const [rawMatches, matches] = match(input, this.regex, this.handlers), [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, void 0];
      if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
        throw new ConflictingSpecificationError(
          "Can't include meridiem when specifying 24-hour format"
        );
      }
      return {
        input,
        tokens: this.tokens,
        regex: this.regex,
        rawMatches,
        matches,
        result,
        zone,
        specificOffset
      };
    }
  }
  get isValid() {
    return !this.disqualifyingUnit;
  }
  get invalidReason() {
    return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
  }
};
function explainFromTokens(locale, input, format) {
  const parser = new TokenParser(locale, format);
  return parser.explainFromTokens(input);
}
function parseFromTokens(locale, input, format) {
  const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, input, format);
  return [result, zone, specificOffset, invalidReason];
}
function formatOptsToTokens(formatOpts, locale) {
  if (!formatOpts) {
    return null;
  }
  const formatter = Formatter.create(locale, formatOpts);
  const df = formatter.dtFormatter(getDummyDateTime());
  const parts = df.formatToParts();
  const resolvedOpts = df.resolvedOptions();
  return parts.map((p) => tokenForPart(p, formatOpts, resolvedOpts));
}

// node_modules/luxon/src/datetime.js
var INVALID3 = "Invalid DateTime";
var MAX_DATE = 864e13;
function unsupportedZone(zone) {
  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
}
function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }
  return dt.weekData;
}
function possiblyCachedLocalWeekData(dt) {
  if (dt.localWeekData === null) {
    dt.localWeekData = gregorianToWeek(
      dt.c,
      dt.loc.getMinDaysInFirstWeek(),
      dt.loc.getStartOfWeek()
    );
  }
  return dt.localWeekData;
}
function clone2(inst, alts) {
  const current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime(__spreadProps(__spreadValues(__spreadValues({}, current), alts), { old: current }));
}
function fixOffset(localTS, o, tz) {
  let utcGuess = localTS - o * 60 * 1e3;
  const o2 = tz.offset(utcGuess);
  if (o === o2) {
    return [utcGuess, o];
  }
  utcGuess -= (o2 - o) * 60 * 1e3;
  const o3 = tz.offset(utcGuess);
  if (o2 === o3) {
    return [utcGuess, o2];
  }
  return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
}
function tsToObj(ts, offset2) {
  ts += offset2 * 60 * 1e3;
  const d = new Date(ts);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
}
function objToTS(obj, offset2, zone) {
  return fixOffset(objToLocalTS(obj), offset2, zone);
}
function adjustTime(inst, dur) {
  const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c = __spreadProps(__spreadValues({}, inst.c), {
    year,
    month,
    day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
  }), millisToAdd = Duration.fromObject({
    years: dur.years - Math.trunc(dur.years),
    quarters: dur.quarters - Math.trunc(dur.quarters),
    months: dur.months - Math.trunc(dur.months),
    weeks: dur.weeks - Math.trunc(dur.weeks),
    days: dur.days - Math.trunc(dur.days),
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as("milliseconds"), localTS = objToLocalTS(c);
  let [ts, o] = fixOffset(localTS, oPre, inst.zone);
  if (millisToAdd !== 0) {
    ts += millisToAdd;
    o = inst.zone.offset(ts);
  }
  return { ts, o };
}
function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
  const { setZone, zone } = opts;
  if (parsed && Object.keys(parsed).length !== 0 || parsedZone) {
    const interpretationZone = parsedZone || zone, inst = DateTime.fromObject(parsed, __spreadProps(__spreadValues({}, opts), {
      zone: interpretationZone,
      specificOffset
    }));
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(
      new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`)
    );
  }
}
function toTechFormat(dt, format, allowZ = true) {
  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
}
function toISODate(o, extended, precision) {
  const longFormat = o.c.year > 9999 || o.c.year < 0;
  let c = "";
  if (longFormat && o.c.year >= 0) c += "+";
  c += padStart(o.c.year, longFormat ? 6 : 4);
  if (precision === "year") return c;
  if (extended) {
    c += "-";
    c += padStart(o.c.month);
    if (precision === "month") return c;
    c += "-";
  } else {
    c += padStart(o.c.month);
    if (precision === "month") return c;
  }
  c += padStart(o.c.day);
  return c;
}
function toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone, precision) {
  let showSeconds = !suppressSeconds || o.c.millisecond !== 0 || o.c.second !== 0, c = "";
  switch (precision) {
    case "day":
    case "month":
    case "year":
      break;
    default:
      c += padStart(o.c.hour);
      if (precision === "hour") break;
      if (extended) {
        c += ":";
        c += padStart(o.c.minute);
        if (precision === "minute") break;
        if (showSeconds) {
          c += ":";
          c += padStart(o.c.second);
        }
      } else {
        c += padStart(o.c.minute);
        if (precision === "minute") break;
        if (showSeconds) {
          c += padStart(o.c.second);
        }
      }
      if (precision === "second") break;
      if (showSeconds && (!suppressMilliseconds || o.c.millisecond !== 0)) {
        c += ".";
        c += padStart(o.c.millisecond, 3);
      }
  }
  if (includeOffset) {
    if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
      c += "Z";
    } else if (o.o < 0) {
      c += "-";
      c += padStart(Math.trunc(-o.o / 60));
      c += ":";
      c += padStart(Math.trunc(-o.o % 60));
    } else {
      c += "+";
      c += padStart(Math.trunc(o.o / 60));
      c += ":";
      c += padStart(Math.trunc(o.o % 60));
    }
  }
  if (extendedZone) {
    c += "[" + o.zone.ianaName + "]";
  }
  return c;
}
var defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
var defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
var defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
var orderedUnits2 = ["year", "month", "day", "hour", "minute", "second", "millisecond"];
var orderedWeekUnits = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
];
var orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function normalizeUnit(unit) {
  const normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];
  if (!normalized) throw new InvalidUnitError(unit);
  return normalized;
}
function normalizeUnitWithLocalWeeks(unit) {
  switch (unit.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return normalizeUnit(unit);
  }
}
function guessOffsetForZone(zone) {
  if (zoneOffsetTs === void 0) {
    zoneOffsetTs = Settings.now();
  }
  if (zone.type !== "iana") {
    return zone.offset(zoneOffsetTs);
  }
  const zoneName = zone.name;
  let offsetGuess = zoneOffsetGuessCache.get(zoneName);
  if (offsetGuess === void 0) {
    offsetGuess = zone.offset(zoneOffsetTs);
    zoneOffsetGuessCache.set(zoneName, offsetGuess);
  }
  return offsetGuess;
}
function quickDT(obj, opts) {
  const zone = normalizeZone(opts.zone, Settings.defaultZone);
  if (!zone.isValid) {
    return DateTime.invalid(unsupportedZone(zone));
  }
  const loc = Locale.fromObject(opts);
  let ts, o;
  if (!isUndefined(obj.year)) {
    for (const u of orderedUnits2) {
      if (isUndefined(obj[u])) {
        obj[u] = defaultUnitValues[u];
      }
    }
    const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
    if (invalid) {
      return DateTime.invalid(invalid);
    }
    const offsetProvis = guessOffsetForZone(zone);
    [ts, o] = objToTS(obj, offsetProvis, zone);
  } else {
    ts = Settings.now();
  }
  return new DateTime({ ts, zone, loc, o });
}
function diffRelative(start, end, opts) {
  const round = isUndefined(opts.round) ? true : opts.round, rounding = isUndefined(opts.rounding) ? "trunc" : opts.rounding, format = (c, unit) => {
    c = roundTo(c, round || opts.calendary ? 0 : 2, opts.calendary ? "round" : rounding);
    const formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c, unit);
  }, differ = (unit) => {
    if (opts.calendary) {
      if (!end.hasSame(start, unit)) {
        return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
      } else return 0;
    } else {
      return end.diff(start, unit).get(unit);
    }
  };
  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }
  for (const unit of opts.units) {
    const count = differ(unit);
    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }
  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}
function lastOpts(argList) {
  let opts = {}, args;
  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
    opts = argList[argList.length - 1];
    args = Array.from(argList).slice(0, argList.length - 1);
  } else {
    args = Array.from(argList);
  }
  return [opts, args];
}
var zoneOffsetTs;
var zoneOffsetGuessCache = /* @__PURE__ */ new Map();
var DateTime = class _DateTime {
  /**
   * @access private
   */
  constructor(config) {
    const zone = config.zone || Settings.defaultZone;
    let invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
    this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
    let c = null, o = null;
    if (!invalid) {
      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
      if (unchanged) {
        [c, o] = [config.old.c, config.old.o];
      } else {
        const ot = isNumber(config.o) && !config.old ? config.o : zone.offset(this.ts);
        c = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c.year) ? new Invalid("invalid input") : null;
        c = invalid ? null : c;
        o = invalid ? null : ot;
      }
    }
    this._zone = zone;
    this.loc = config.loc || Locale.create();
    this.invalid = invalid;
    this.weekData = null;
    this.localWeekData = null;
    this.c = c;
    this.o = o;
    this.isLuxonDateTime = true;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new _DateTime({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
    opts.zone = FixedOffsetZone.utcInstance;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(date, options = {}) {
    const ts = isDate(date) ? date.valueOf() : NaN;
    if (Number.isNaN(ts)) {
      return _DateTime.invalid("invalid input");
    }
    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return _DateTime.invalid(unsupportedZone(zoneToUse));
    }
    return new _DateTime({
      ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(milliseconds, options = {}) {
    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError(
        `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
      );
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      return _DateTime.invalid("Timestamp out of range");
    } else {
      return new _DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(seconds, options = {}) {
    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new _DateTime({
        ts: seconds * 1e3,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.localWeekYear - a week year, according to the locale
   * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
   * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
   * @return {DateTime}
   */
  static fromObject(obj, opts = {}) {
    obj = obj || {};
    const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return _DateTime.invalid(unsupportedZone(zoneToUse));
    }
    const loc = Locale.fromObject(opts);
    const normalized = normalizeObject(obj, normalizeUnitWithLocalWeeks);
    const { minDaysInFirstWeek, startOfWeek } = usesLocalWeekValues(normalized, loc);
    const tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
    let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow, minDaysInFirstWeek, startOfWeek);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits2;
      defaultValues = defaultUnitValues;
    }
    let foundFirst = false;
    for (const u of units) {
      const v = normalized[u];
      if (!isUndefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    }
    const higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
    if (invalid) {
      return _DateTime.invalid(invalid);
    }
    const gregorian = useWeekData ? weekToGregorian(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new _DateTime({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc
    });
    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return _DateTime.invalid(
        "mismatched weekday",
        `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
      );
    }
    if (!inst.isValid) {
      return _DateTime.invalid(inst.invalid);
    }
    return inst;
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(text, opts = {}) {
    const [vals, parsedZone] = parseISODate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(text, opts = {}) {
    const [vals, parsedZone] = parseRFC2822Date(text);
    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(text, opts = {}) {
    const [vals, parsedZone] = parseHTTPDate(text);
    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(text, fmt, opts = {}) {
    if (isUndefined(text) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }
    const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
    if (invalid) {
      return _DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
    }
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(text, fmt, opts = {}) {
    return _DateTime.fromFormat(text, fmt, opts);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(text, opts = {}) {
    const [vals, parsedZone] = parseSQL(text);
    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }
  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    } else {
      return new _DateTime({ invalid });
    }
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(o) {
    return o && o.isLuxonDateTime || false;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(formatOpts, localeOpts = {}) {
    const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
    return !tokenList ? null : tokenList.map((t) => t ? t.val : null).join("");
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(fmt, localeOpts = {}) {
    const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
    return expanded.map((t) => t.val).join("");
  }
  static resetCache() {
    zoneOffsetTs = void 0;
    zoneOffsetGuessCache.clear();
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(unit) {
    return this[unit];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
  }
  /**
   * Returns true if this date is on a weekend according to the locale, false otherwise
   * @returns {boolean}
   */
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  /**
   * Get the day of the week according to the locale.
   * 1 is the first day of the week and 7 is the last day of the week.
   * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
   * @returns {number}
   */
  get localWeekday() {
    return this.isValid ? possiblyCachedLocalWeekData(this).weekday : NaN;
  }
  /**
   * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
   * because the week can start on different days of the week (see localWeekday) and because a different number of days
   * is required for a week to count as the first week of a year.
   * @returns {number}
   */
  get localWeekNumber() {
    return this.isValid ? possiblyCachedLocalWeekData(this).weekNumber : NaN;
  }
  /**
   * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
   * differently, see localWeekNumber.
   * @returns {number}
   */
  get localWeekYear() {
    return this.isValid ? possiblyCachedLocalWeekData(this).weekYear : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Info.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Info.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Info.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Info.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "short",
        locale: this.locale
      });
    } else {
      return null;
    }
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "long",
        locale: this.locale
      });
    } else {
      return null;
    }
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    if (this.isOffsetFixed) {
      return false;
    } else {
      return this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
    }
  }
  /**
   * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
   * in this DateTime's zone. During DST changes local time can be ambiguous, for example
   * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
   * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
   * @returns {DateTime[]}
   */
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed) {
      return [this];
    }
    const dayMs = 864e5;
    const minuteMs = 6e4;
    const localTS = objToLocalTS(this.c);
    const oEarlier = this.zone.offset(localTS - dayMs);
    const oLater = this.zone.offset(localTS + dayMs);
    const o1 = this.zone.offset(localTS - oEarlier * minuteMs);
    const o2 = this.zone.offset(localTS - oLater * minuteMs);
    if (o1 === o2) {
      return [this];
    }
    const ts1 = localTS - o1 * minuteMs;
    const ts2 = localTS - o2 * minuteMs;
    const c1 = tsToObj(ts1, o1);
    const c2 = tsToObj(ts2, o2);
    if (c1.hour === c2.hour && c1.minute === c2.minute && c1.second === c2.second && c1.millisecond === c2.millisecond) {
      return [clone2(this, { ts: ts1 }), clone2(this, { ts: ts2 })];
    }
    return [this];
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return isLeapYear(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return daysInMonth(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? daysInYear(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's local week year
   * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
   * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
   * @type {number}
   */
  get weeksInLocalWeekYear() {
    return this.isValid ? weeksInWeekYear(
      this.localWeekYear,
      this.loc.getMinDaysInFirstWeek(),
      this.loc.getStartOfWeek()
    ) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(opts = {}) {
    const { locale, numberingSystem, calendar } = Formatter.create(
      this.loc.clone(opts),
      opts
    ).resolvedOptions(this);
    return { locale, numberingSystem, outputCalendar: calendar };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(offset2 = 0, opts = {}) {
    return this.setZone(FixedOffsetZone.instance(offset2), opts);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(Settings.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
    zone = normalizeZone(zone, Settings.defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return _DateTime.invalid(unsupportedZone(zone));
    } else {
      let newTS = this.ts;
      if (keepLocalTime || keepCalendarTime) {
        const offsetGuess = zone.offset(this.ts);
        const asObj = this.toObject();
        [newTS] = objToTS(asObj, offsetGuess, zone);
      }
      return clone2(this, { ts: newTS, zone });
    }
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
    return clone2(this, { loc });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(locale) {
    return this.reconfigure({ locale });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   *
   * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
   * They cannot be mixed with ISO-week units like `weekday`.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(values) {
    if (!this.isValid) return this;
    const normalized = normalizeObject(values, normalizeUnitWithLocalWeeks);
    const { minDaysInFirstWeek, startOfWeek } = usesLocalWeekValues(normalized, this.loc);
    const settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    let mixed;
    if (settingWeekStuff) {
      mixed = weekToGregorian(
        __spreadValues(__spreadValues({}, gregorianToWeek(this.c, minDaysInFirstWeek, startOfWeek)), normalized),
        minDaysInFirstWeek,
        startOfWeek
      );
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian(__spreadValues(__spreadValues({}, gregorianToOrdinal(this.c)), normalized));
    } else {
      mixed = __spreadValues(__spreadValues({}, this.toObject()), normalized);
      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }
    const [ts, o] = objToTS(mixed, this.o, this.zone);
    return clone2(this, { ts, o });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(duration) {
    if (!this.isValid) return this;
    const dur = Duration.fromDurationLike(duration);
    return clone2(this, adjustTime(this, dur));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(duration) {
    if (!this.isValid) return this;
    const dur = Duration.fromDurationLike(duration).negate();
    return clone2(this, adjustTime(this, dur));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(unit, { useLocaleWeeks = false } = {}) {
    if (!this.isValid) return this;
    const o = {}, normalizedUnit = Duration.normalizeUnit(unit);
    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      // falls through
      case "quarters":
      case "months":
        o.day = 1;
      // falls through
      case "weeks":
      case "days":
        o.hour = 0;
      // falls through
      case "hours":
        o.minute = 0;
      // falls through
      case "minutes":
        o.second = 0;
      // falls through
      case "seconds":
        o.millisecond = 0;
        break;
      case "milliseconds":
        break;
    }
    if (normalizedUnit === "weeks") {
      if (useLocaleWeeks) {
        const startOfWeek = this.loc.getStartOfWeek();
        const { weekday } = this;
        if (weekday < startOfWeek) {
          o.weekNumber = this.weekNumber - 1;
        }
        o.weekday = startOfWeek;
      } else {
        o.weekday = 1;
      }
    }
    if (normalizedUnit === "quarters") {
      const q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }
    return this.set(o);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(unit, opts) {
    return this.isValid ? this.plus({ [unit]: 1 }).startOf(unit, opts).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID3;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID3;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(opts = {}) {
    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'years', 'months', 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @example DateTime.now().toISO({ precision: 'day' }) //=> '2017-04-22Z'
   * @example DateTime.now().toISO({ precision: 'minute' }) //=> '2017-04-22T20:47Z'
   * @return {string|null}
   */
  toISO({
    format = "extended",
    suppressSeconds = false,
    suppressMilliseconds = false,
    includeOffset = true,
    extendedZone = false,
    precision = "milliseconds"
  } = {}) {
    if (!this.isValid) {
      return null;
    }
    precision = normalizeUnit(precision);
    const ext = format === "extended";
    let c = toISODate(this, ext, precision);
    if (orderedUnits2.indexOf(precision) >= 3) c += "T";
    c += toISOTime(
      this,
      ext,
      suppressSeconds,
      suppressMilliseconds,
      includeOffset,
      extendedZone,
      precision
    );
    return c;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='day'] - truncate output to desired precision: 'years', 'months', or 'days'.
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @example DateTime.utc(1982, 5, 25).toISODate({ precision: 'month' }) //=> '1982-05'
   * @return {string|null}
   */
  toISODate({ format = "extended", precision = "day" } = {}) {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, format === "extended", normalizeUnit(precision));
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, second: 56 }).toISOTime({ precision: 'minute' }) //=> '07:34Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds = false,
    suppressSeconds = false,
    includeOffset = true,
    includePrefix = false,
    extendedZone = false,
    format = "extended",
    precision = "milliseconds"
  } = {}) {
    if (!this.isValid) {
      return null;
    }
    precision = normalizeUnit(precision);
    let c = includePrefix && orderedUnits2.indexOf(precision) >= 3 ? "T" : "";
    return c + toISOTime(
      this,
      format === "extended",
      suppressSeconds,
      suppressMilliseconds,
      includeOffset,
      extendedZone,
      precision
    );
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string|null}
   */
  toSQLDate() {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
    let fmt = "HH:mm:ss.SSS";
    if (includeZone || includeOffset) {
      if (includeOffsetSpace) {
        fmt += " ";
      }
      if (includeZone) {
        fmt += "z";
      } else if (includeOffset) {
        fmt += "ZZ";
      }
    }
    return toTechFormat(this, fmt, true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(opts = {}) {
    if (!this.isValid) {
      return null;
    }
    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : INVALID3;
  }
  /**
   * Returns a string representation of this DateTime appropriate for the REPL.
   * @return {string}
   */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (this.isValid) {
      return `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`;
    } else {
      return `DateTime { Invalid, reason: ${this.invalidReason} }`;
    }
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(opts = {}) {
    if (!this.isValid) return {};
    const base = __spreadValues({}, this.c);
    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(otherDateTime, unit = "milliseconds", opts = {}) {
    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }
    const durOpts = __spreadValues({ locale: this.locale, numberingSystem: this.numberingSystem }, opts);
    const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff_default(earlier, later, units, durOpts);
    return otherIsLater ? diffed.negate() : diffed;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(unit = "milliseconds", opts = {}) {
    return this.diff(_DateTime.now(), unit, opts);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval|DateTime}
   */
  until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @param {Object} opts - options
   * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(otherDateTime, unit, opts) {
    if (!this.isValid) return false;
    const inputMs = otherDateTime.valueOf();
    const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
    return adjustedToZone.startOf(unit, opts) <= inputMs && inputMs <= adjustedToZone.endOf(unit, opts);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(other) {
    return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds towards zero by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {string} [options.rounding="trunc"] - rounding method to use when rounding the numbers in the output. Can be "trunc" (toward zero), "expand" (away from zero), "round", "floor", or "ceil".
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(options = {}) {
    if (!this.isValid) return null;
    const base = options.base || _DateTime.fromObject({}, { zone: this.zone }), padding = options.padding ? this < base ? -options.padding : options.padding : 0;
    let units = ["years", "months", "days", "hours", "minutes", "seconds"];
    let unit = options.unit;
    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = void 0;
    }
    return diffRelative(base, this.plus(padding), __spreadProps(__spreadValues({}, options), {
      numeric: "always",
      units,
      unit
    }));
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(options = {}) {
    if (!this.isValid) return null;
    return diffRelative(options.base || _DateTime.fromObject({}, { zone: this.zone }), this, __spreadProps(__spreadValues({}, options), {
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true
    }));
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...dateTimes) {
    if (!dateTimes.every(_DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...dateTimes) {
    if (!dateTimes.every(_DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(text, fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text, fmt);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(text, fmt, options = {}) {
    return _DateTime.fromFormatExplain(text, fmt, options);
  }
  /**
   * Build a parser for `fmt` using the given locale. This parser can be passed
   * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
   * can be used to optimize cases where many dates need to be parsed in a
   * specific format.
   *
   * @param {String} fmt - the format the string is expected to be in (see
   * description)
   * @param {Object} options - options used to set locale and numberingSystem
   * for parser
   * @returns {TokenParser} - opaque object to be used
   */
  static buildFormatParser(fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return new TokenParser(localeToUse, fmt);
  }
  /**
   * Create a DateTime from an input string and format parser.
   *
   * The format parser must have been created with the same locale as this call.
   *
   * @param {String} text - the string to parse
   * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
   * @param {Object} opts - options taken by fromFormat()
   * @returns {DateTime}
   */
  static fromFormatParser(text, formatParser, opts = {}) {
    if (isUndefined(text) || isUndefined(formatParser)) {
      throw new InvalidArgumentError(
        "fromFormatParser requires an input string and a format parser"
      );
    }
    const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    if (!localeToUse.equals(formatParser.locale)) {
      throw new InvalidArgumentError(
        `fromFormatParser called with a locale of ${localeToUse}, but the format parser was created for ${formatParser.locale}`
      );
    }
    const { result, zone, specificOffset, invalidReason } = formatParser.explainFromTokens(text);
    if (invalidReason) {
      return _DateTime.invalid(invalidReason);
    } else {
      return parseDataToDateTime(
        result,
        zone,
        opts,
        `format ${formatParser.format}`,
        text,
        specificOffset
      );
    }
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return DATE_SHORT;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return DATE_MED;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return DATE_MED_WITH_WEEKDAY;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return DATE_FULL;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return DATE_HUGE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return TIME_SIMPLE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return TIME_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return TIME_WITH_SHORT_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return TIME_WITH_LONG_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return TIME_24_SIMPLE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return TIME_24_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return TIME_24_WITH_SHORT_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return TIME_24_WITH_LONG_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return DATETIME_SHORT;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return DATETIME_SHORT_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return DATETIME_MED;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return DATETIME_MED_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return DATETIME_MED_WITH_WEEKDAY;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return DATETIME_FULL;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return DATETIME_FULL_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return DATETIME_HUGE;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return DATETIME_HUGE_WITH_SECONDS;
  }
};
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError(
      `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
    );
  }
}

// node_modules/ngx-material-timepicker/fesm2015/ngx-material-timepicker.js
var _c0 = ["*"];
function NgxMaterialTimepickerContentComponent_div_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMaterialTimepickerContentComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3);
    ɵɵtemplate(1, NgxMaterialTimepickerContentComponent_div_0_ng_container_1_Template, 1, 0, "ng-container", 4);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const timepickerOutlet_r2 = ɵɵreference(4);
    ɵɵproperty("ngxAppendToInput", ctx_r0.inputElement);
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", timepickerOutlet_r2);
  }
}
function NgxMaterialTimepickerContentComponent_ng_template_1_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMaterialTimepickerContentComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NgxMaterialTimepickerContentComponent_ng_template_1_ng_container_0_Template, 1, 0, "ng-container", 4);
  }
  if (rf & 2) {
    ɵɵnextContext();
    const timepickerOutlet_r2 = ɵɵreference(4);
    ɵɵproperty("ngTemplateOutlet", timepickerOutlet_r2);
  }
}
function NgxMaterialTimepickerContentComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
var _c1 = ["editableTimeTmpl"];
var _c2 = (a0) => ({
  "timepicker-dial__item_active": a0
});
function NgxMaterialTimepickerDialControlComponent_input_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 3);
    ɵɵpipe(1, "timeLocalizer");
    ɵɵlistener("ngModelChange", function NgxMaterialTimepickerDialControlComponent_input_0_Template_input_ngModelChange_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.time = $event);
    })("input", function NgxMaterialTimepickerDialControlComponent_input_0_Template_input_input_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.updateTime());
    })("focus", function NgxMaterialTimepickerDialControlComponent_input_0_Template_input_focus_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.saveTimeAndChangeTimeUnit($event, ctx_r1.timeUnit));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c2, ctx_r1.isActive))("ngModel", ɵɵpipeBind2(1, 4, ctx_r1.time, ctx_r1.timeUnit))("disabled", ctx_r1.disabled)("timepickerAutofocus", ctx_r1.isActive);
  }
}
function NgxMaterialTimepickerDialControlComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "input", 4, 1);
    ɵɵlistener("focus", function NgxMaterialTimepickerDialControlComponent_ng_template_1_Template_input_focus_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.saveTimeAndChangeTimeUnit($event, ctx_r1.timeUnit));
    })("keydown", function NgxMaterialTimepickerDialControlComponent_ng_template_1_Template_input_keydown_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onKeydown($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("formControl", ctx_r1.timeControl)("ngClass", ɵɵpureFunction1(3, _c2, ctx_r1.isActive))("timepickerAutofocus", ctx_r1.isActive);
  }
}
function NgxMaterialTimepickerPeriodComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 3);
    ɵɵlistener("@scaleInOut.done", function NgxMaterialTimepickerPeriodComponent_div_5_Template_div_animation_scaleInOut_done_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.animationDone());
    });
    ɵɵelementStart(1, "p");
    ɵɵtext(2, "Current time would be invalid in this period.");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    ɵɵproperty("@scaleInOut", void 0);
  }
}
var _c3 = (a0) => ({
  "timepicker-dial__period--hidden": a0
});
var _c4 = (a0) => ({
  "timepicker-dial__hint-container--hidden": a0
});
function NgxMaterialTimepickerDialComponent_div_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMaterialTimepickerDialComponent_div_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "small", 10);
    ɵɵtext(1, " * use arrows (");
    ɵɵelementStart(2, "span");
    ɵɵtext(3, "⇅");
    ɵɵelementEnd();
    ɵɵtext(4, ") to change the time");
    ɵɵelementEnd();
  }
}
function NgxMaterialTimepickerDialComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtemplate(1, NgxMaterialTimepickerDialComponent_div_8_ng_container_1_Template, 1, 0, "ng-container", 9)(2, NgxMaterialTimepickerDialComponent_div_8_ng_template_2_Template, 5, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const editableHintDefault_r1 = ɵɵreference(3);
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c4, !ctx_r1.isHintVisible));
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.editableHintTmpl ? ctx_r1.editableHintTmpl : editableHintDefault_r1);
  }
}
var _c5 = ["clockFace"];
var _c6 = ["clockHand"];
var _c7 = (a0) => ({
  "clock-face__clock-hand_minute": a0
});
var _c8 = (a0) => ({
  "transform": a0
});
var _c9 = (a0, a1) => ({
  "active": a0,
  "disabled": a1
});
function NgxMaterialTimepickerFaceComponent_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9)(1, "span", 10);
    ɵɵpipe(2, "activeHour");
    ɵɵtext(3);
    ɵɵpipe(4, "timeLocalizer");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const time_r1 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(11, _c8, "rotateZ(" + time_r1.angle + "deg) translateX(-50%)"));
    ɵɵadvance();
    ɵɵproperty("ngStyle", ɵɵpureFunction1(13, _c8, "rotateZ(-" + time_r1.angle + "deg)"))("ngClass", ɵɵpureFunction2(15, _c9, ɵɵpipeBind3(2, 4, time_r1.time, ctx_r1.selectedTime.time, ctx_r1.isClockFaceDisabled), time_r1.disabled));
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(4, 8, time_r1.time, ctx_r1.timeUnit.HOUR), " ");
  }
}
function NgxMaterialTimepickerFaceComponent_div_2_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 13)(1, "span", 10);
    ɵɵpipe(2, "activeHour");
    ɵɵtext(3);
    ɵɵpipe(4, "timeLocalizer");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const time_r3 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵstyleProp("height", ctx_r1.innerClockFaceSize, "px");
    ɵɵproperty("ngStyle", ɵɵpureFunction1(13, _c8, "rotateZ(" + time_r3.angle + "deg) translateX(-50%)"));
    ɵɵadvance();
    ɵɵproperty("ngStyle", ɵɵpureFunction1(15, _c8, "rotateZ(-" + time_r3.angle + "deg)"))("ngClass", ɵɵpureFunction2(17, _c9, ɵɵpipeBind3(2, 6, time_r3.time, ctx_r1.selectedTime == null ? null : ctx_r1.selectedTime.time, ctx_r1.isClockFaceDisabled), time_r3.disabled));
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(4, 10, time_r3.time, ctx_r1.timeUnit.HOUR));
  }
}
function NgxMaterialTimepickerFaceComponent_div_2_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 11);
    ɵɵtemplate(1, NgxMaterialTimepickerFaceComponent_div_2_div_3_div_1_Template, 5, 20, "div", 12);
    ɵɵpipe(2, "slice");
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵstyleProp("top", "calc(50% - " + ctx_r1.innerClockFaceSize + "px)");
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 4, ctx_r1.faceTime, 12, 24))("ngForTrackBy", ctx_r1.trackByTime);
  }
}
function NgxMaterialTimepickerFaceComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵtemplate(1, NgxMaterialTimepickerFaceComponent_div_2_div_1_Template, 5, 18, "div", 7);
    ɵɵpipe(2, "slice");
    ɵɵtemplate(3, NgxMaterialTimepickerFaceComponent_div_2_div_3_Template, 3, 8, "div", 8);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ɵɵpipeBind3(2, 3, ctx_r1.faceTime, 0, 12))("ngForTrackBy", ctx_r1.trackByTime);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", ctx_r1.faceTime.length > 12);
  }
}
function NgxMaterialTimepickerFaceComponent_ng_template_5_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9)(1, "span", 10);
    ɵɵpipe(2, "activeMinute");
    ɵɵtext(3);
    ɵɵpipe(4, "minutesFormatter");
    ɵɵpipe(5, "timeLocalizer");
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const time_r4 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("ngStyle", ɵɵpureFunction1(15, _c8, "rotateZ(" + time_r4.angle + "deg) translateX(-50%)"));
    ɵɵadvance();
    ɵɵproperty("ngStyle", ɵɵpureFunction1(17, _c8, "rotateZ(-" + time_r4.angle + "deg)"))("ngClass", ɵɵpureFunction2(19, _c9, ɵɵpipeBind4(2, 4, time_r4.time, ctx_r1.selectedTime == null ? null : ctx_r1.selectedTime.time, ctx_r1.minutesGap, ctx_r1.isClockFaceDisabled), time_r4.disabled));
    ɵɵadvance(2);
    ɵɵtextInterpolate1(" ", ɵɵpipeBind2(5, 12, ɵɵpipeBind2(4, 9, time_r4.time, ctx_r1.minutesGap), ctx_r1.timeUnit.MINUTE));
  }
}
function NgxMaterialTimepickerFaceComponent_ng_template_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵtemplate(1, NgxMaterialTimepickerFaceComponent_ng_template_5_div_1_Template, 6, 22, "div", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngForOf", ctx_r1.faceTime)("ngForTrackBy", ctx_r1.trackByTime);
  }
}
var _c10 = (a0) => ({
  "timepicker-backdrop-overlay--transparent": a0
});
function NgxMaterialTimepickerContainerComponent_div_11_ngx_material_timepicker_24_hours_face_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-material-timepicker-24-hours-face", 17);
    ɵɵpipe(1, "async");
    ɵɵlistener("hourChange", function NgxMaterialTimepickerContainerComponent_div_11_ngx_material_timepicker_24_hours_face_1_Template_ngx_material_timepicker_24_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onHourChange($event));
    })("hourSelected", function NgxMaterialTimepickerContainerComponent_div_11_ngx_material_timepicker_24_hours_face_1_Template_ngx_material_timepicker_24_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("selectedHour", ɵɵpipeBind1(1, 4, ctx_r2.selectedHour))("minTime", ctx_r2.minTime)("maxTime", ctx_r2.maxTime)("format", ctx_r2.format);
  }
}
function NgxMaterialTimepickerContainerComponent_div_11_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-material-timepicker-12-hours-face", 18);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵlistener("hourChange", function NgxMaterialTimepickerContainerComponent_div_11_ng_template_2_Template_ngx_material_timepicker_12_hours_face_hourChange_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onHourChange($event));
    })("hourSelected", function NgxMaterialTimepickerContainerComponent_div_11_ng_template_2_Template_ngx_material_timepicker_12_hours_face_hourSelected_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r2.onHourSelected($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty("selectedHour", ɵɵpipeBind1(1, 4, ctx_r2.selectedHour))("period", ɵɵpipeBind1(2, 6, ctx_r2.selectedPeriod))("minTime", ctx_r2.minTime)("maxTime", ctx_r2.maxTime);
  }
}
function NgxMaterialTimepickerContainerComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, NgxMaterialTimepickerContainerComponent_div_11_ngx_material_timepicker_24_hours_face_1_Template, 2, 6, "ngx-material-timepicker-24-hours-face", 16)(2, NgxMaterialTimepickerContainerComponent_div_11_ng_template_2_Template, 3, 8, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ampmHours_r5 = ɵɵreference(3);
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r2.format === 24)("ngIfElse", ampmHours_r5);
  }
}
function NgxMaterialTimepickerContainerComponent_ngx_material_timepicker_minutes_face_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-material-timepicker-minutes-face", 19);
    ɵɵpipe(1, "async");
    ɵɵpipe(2, "async");
    ɵɵpipe(3, "async");
    ɵɵlistener("minuteChange", function NgxMaterialTimepickerContainerComponent_ngx_material_timepicker_minutes_face_12_Template_ngx_material_timepicker_minutes_face_minuteChange_0_listener($event) {
      ɵɵrestoreView(_r6);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.onMinuteChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("selectedMinute", ɵɵpipeBind1(1, 7, ctx_r2.selectedMinute))("selectedHour", (tmp_4_0 = ɵɵpipeBind1(2, 9, ctx_r2.selectedHour)) == null ? null : tmp_4_0.time)("minTime", ctx_r2.minTime)("maxTime", ctx_r2.maxTime)("format", ctx_r2.format)("period", ɵɵpipeBind1(3, 11, ctx_r2.selectedPeriod))("minutesGap", ctx_r2.minutesGap);
  }
}
function NgxMaterialTimepickerContainerComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMaterialTimepickerContainerComponent_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxMaterialTimepickerContainerComponent_ng_template_18_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ngx-material-timepicker-button");
    ɵɵtext(1, "Cancel");
    ɵɵelementEnd();
  }
}
function NgxMaterialTimepickerContainerComponent_ng_template_20_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ngx-material-timepicker-button");
    ɵɵtext(1, "Ok");
    ɵɵelementEnd();
  }
}
var _c11 = [[["", "ngxMaterialTimepickerToggleIcon", ""]]];
var _c12 = ["[ngxMaterialTimepickerToggleIcon]"];
function NgxMaterialTimepickerToggleComponent__svg_svg_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 2);
    ɵɵelement(1, "path", 3);
    ɵɵelementEnd();
  }
}
var _c13 = (a0) => ({
  "ngx-timepicker-control--active": a0
});
var _c14 = (a0) => ({
  "period-control__button--disabled": a0
});
var _c15 = (a0) => ({
  "period-selector__button--active": a0
});
function NgxTimepickerPeriodSelectorComponent_ul_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ul", 6)(1, "li")(2, "button", 7);
    ɵɵlistener("click", function NgxTimepickerPeriodSelectorComponent_ul_7_Template_button_click_2_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select(ctx_r1.period.AM));
    });
    ɵɵtext(3);
    ɵɵelementEnd()();
    ɵɵelementStart(4, "li")(5, "button", 7);
    ɵɵlistener("click", function NgxTimepickerPeriodSelectorComponent_ul_7_Template_button_click_5_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.select(ctx_r1.period.PM));
    });
    ɵɵtext(6);
    ɵɵelementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("@scaleInOut", void 0)("timepickerAutofocus", true);
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(6, _c15, ctx_r1.localizedPeriod === ctx_r1.meridiems[0]));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.meridiems[0]);
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c15, ctx_r1.localizedPeriod === ctx_r1.meridiems[1]));
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r1.meridiems[1]);
  }
}
function NgxTimepickerPeriodSelectorComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 8);
    ɵɵlistener("click", function NgxTimepickerPeriodSelectorComponent_div_8_Template_div_click_0_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.backdropClick());
    });
    ɵɵelementEnd();
  }
}
var _c16 = (a0) => ({
  "ngx-timepicker--disabled": a0
});
var _c17 = (a0) => ({
  "ngx-timepicker__toggle--left": a0
});
function NgxTimepickerFieldComponent_ngx_timepicker_period_selector_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ngx-timepicker-period-selector", 9);
    ɵɵlistener("periodSelected", function NgxTimepickerFieldComponent_ngx_timepicker_period_selector_7_Template_ngx_timepicker_period_selector_periodSelected_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.changePeriod($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("selectedPeriod", ctx_r2.period)("disabled", ctx_r2.disabled || ctx_r2.isChangePeriodDisabled);
  }
}
function NgxTimepickerFieldComponent_ngx_material_timepicker_toggle_8_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NgxTimepickerFieldComponent_ngx_material_timepicker_toggle_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "ngx-material-timepicker-toggle", 10)(1, "span", 11);
    ɵɵtemplate(2, NgxTimepickerFieldComponent_ngx_material_timepicker_toggle_8_ng_container_2_Template, 1, 0, "ng-container", 12);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    const timepicker_r4 = ɵɵreference(10);
    const defaultIcon_r5 = ɵɵreference(12);
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c17, ctx_r2.buttonAlign === "left"))("for", timepicker_r4)("disabled", ctx_r2.disabled);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r2.toggleIcon || defaultIcon_r5);
  }
}
function NgxTimepickerFieldComponent_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵnamespaceSVG();
    ɵɵelementStart(0, "svg", 13);
    ɵɵelement(1, "path", 14);
    ɵɵelementEnd();
  }
}
var TimeUnit;
(function(TimeUnit2) {
  TimeUnit2[TimeUnit2["HOUR"] = 0] = "HOUR";
  TimeUnit2[TimeUnit2["MINUTE"] = 1] = "MINUTE";
})(TimeUnit || (TimeUnit = {}));
var TimePeriod;
(function(TimePeriod2) {
  TimePeriod2["AM"] = "AM";
  TimePeriod2["PM"] = "PM";
})(TimePeriod || (TimePeriod = {}));
var TimeFormat;
(function(TimeFormat2) {
  TimeFormat2["TWELVE"] = "hh:mm a";
  TimeFormat2["TWELVE_SHORT"] = "h:m a";
  TimeFormat2["TWENTY_FOUR"] = "HH:mm";
  TimeFormat2["TWENTY_FOUR_SHORT"] = "H:m";
})(TimeFormat || (TimeFormat = {}));
function isSameOrAfter(time, compareWith, unit = "minutes") {
  if (unit === "hours") {
    return time.hour >= compareWith.hour;
  }
  if (unit === "minutes") {
    return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
  }
}
function isSameOrBefore(time, compareWith, unit = "minutes") {
  if (unit === "hours") {
    return time.hour <= compareWith.hour;
  }
  if (unit === "minutes") {
    return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
  }
}
function isBetween(time, before, after, unit = "minutes") {
  if (unit === "hours") {
    return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
  }
  if (unit === "minutes") {
    return isSameOrBefore(time, after) && isSameOrAfter(time, before);
  }
}
function isDigit(e) {
  if ([46, 8, 9, 27, 13].some((n2) => n2 === e.keyCode) || // Allow: Ctrl/cmd+A
  e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || // Allow: Ctrl/cmd+C
  e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || // Allow: Ctrl/cmd+X
  e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || // Allow: home, end, left, right, up, down
  e.keyCode >= 35 && e.keyCode <= 40) {
    return true;
  }
  return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
}
var TimeAdapter = class _TimeAdapter {
  static parseTime(time, opts) {
    const {
      numberingSystem,
      locale
    } = _TimeAdapter.getLocaleOptionsByTime(time, opts);
    const isPeriodExist = time.split(" ").length === 2;
    const timeMask = isPeriodExist ? TimeFormat.TWELVE_SHORT : TimeFormat.TWENTY_FOUR_SHORT;
    return DateTime.fromFormat(time, timeMask, {
      numberingSystem,
      locale
    });
  }
  static formatTime(time, opts) {
    if (!time) {
      return "Invalid Time";
    }
    const {
      format
    } = opts;
    const parsedTime = _TimeAdapter.parseTime(time, opts).setLocale(_TimeAdapter.DEFAULT_LOCALE);
    if (!parsedTime.isValid) {
      return null;
    }
    if (format !== 24) {
      return parsedTime.toLocaleString(Object.assign(Object.assign({}, DateTime.TIME_SIMPLE), {
        hour12: format !== 24,
        numberingSystem: _TimeAdapter.DEFAULT_NUMBERING_SYSTEM
      })).replace(/\u200E/g, "").replace(/\u202F/g, " ");
    }
    return parsedTime.toISOTime({
      includeOffset: false,
      suppressMilliseconds: true,
      suppressSeconds: true
    }).replace(/\u200E/g, "").replace(/\u202F/g, " ");
  }
  static toLocaleTimeString(time, opts = {}) {
    const {
      format = _TimeAdapter.DEFAULT_FORMAT,
      locale = _TimeAdapter.DEFAULT_LOCALE
    } = opts;
    const hourCycle = format === 24 ? "h23" : "h12";
    const timeFormat = Object.assign(Object.assign({}, DateTime.TIME_SIMPLE), {
      hourCycle
    });
    const timeMask = format === 24 ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
    const localOpts = Object.assign({
      locale: opts.locale,
      numberingSystem: opts.numberingSystem
    }, timeFormat);
    return DateTime.fromFormat(time, timeMask).setLocale(locale).toLocaleString(localOpts).replace(/\u202F/g, " ");
  }
  static isTimeAvailable(time, min, max, granularity, minutesGap, format) {
    if (!time) {
      return;
    }
    const convertedTime = this.parseTime(time, {
      format
    });
    const minutes = convertedTime.minute;
    if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
      throw new Error(`Your minutes - ${minutes} doesn't match your minutesGap - ${minutesGap}`);
    }
    const isAfter = min && !max && isSameOrAfter(convertedTime, min, granularity);
    const isBefore = max && !min && isSameOrBefore(convertedTime, max, granularity);
    const between = min && max && isBetween(convertedTime, min, max, granularity);
    const isAvailable = !min && !max;
    return isAfter || isBefore || between || isAvailable;
  }
  /***
   *  Format hour according to time format (12 or 24)
   */
  static formatHour(currentHour, format, period) {
    if (format === 24) {
      return currentHour;
    }
    const hour = period === TimePeriod.AM ? currentHour : currentHour + 12;
    if (period === TimePeriod.AM && hour === 12) {
      return 0;
    } else if (period === TimePeriod.PM && hour === 24) {
      return 12;
    }
    return hour;
  }
  static fromDateTimeToString(time, format) {
    const timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
    return time.reconfigure({
      numberingSystem: _TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
      locale: _TimeAdapter.DEFAULT_LOCALE
    }).toFormat(timeFormat).replace(/\u202F/g, " ");
  }
  static getLocaleOptionsByTime(time, opts) {
    const localeConfig = {
      numberingSystem: opts.numberingSystem,
      locale: opts.locale
    };
    const defaultConfig = {
      numberingSystem: _TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
      locale: _TimeAdapter.DEFAULT_LOCALE
    };
    return isNaN(parseInt(time, 10)) ? localeConfig : defaultConfig;
  }
};
TimeAdapter.DEFAULT_FORMAT = 12;
TimeAdapter.DEFAULT_LOCALE = "en-US";
TimeAdapter.DEFAULT_NUMBERING_SYSTEM = "latn";
var DEFAULT_HOUR = {
  time: 12,
  angle: 360
};
var DEFAULT_MINUTE = {
  time: 0,
  angle: 360
};
var NgxMaterialTimepickerService = class {
  constructor() {
    this.hourSubject = new BehaviorSubject(DEFAULT_HOUR);
    this.minuteSubject = new BehaviorSubject(DEFAULT_MINUTE);
    this.periodSubject = new BehaviorSubject(TimePeriod.AM);
  }
  set hour(hour) {
    this.hourSubject.next(hour);
  }
  get selectedHour() {
    return this.hourSubject.asObservable();
  }
  set minute(minute) {
    this.minuteSubject.next(minute);
  }
  get selectedMinute() {
    return this.minuteSubject.asObservable();
  }
  set period(period) {
    const isPeriodValid = period === TimePeriod.AM || period === TimePeriod.PM;
    if (isPeriodValid) {
      this.periodSubject.next(period);
    }
  }
  get selectedPeriod() {
    return this.periodSubject.asObservable();
  }
  setDefaultTimeIfAvailable(time, min, max, format, minutesGap) {
    try {
      if (TimeAdapter.isTimeAvailable(time, min, max, "minutes", minutesGap)) {
        this.setDefaultTime(time, format);
      }
    } catch (e) {
      console.error(e);
    }
  }
  getFullTime(format) {
    const selectedHour = this.hourSubject.getValue().time;
    const selectedMinute = this.minuteSubject.getValue().time;
    const hour = selectedHour != null ? selectedHour : DEFAULT_HOUR.time;
    const minute = selectedMinute != null ? selectedMinute : DEFAULT_MINUTE.time;
    const period = format === 12 ? this.periodSubject.getValue() : "";
    const time = `${hour}:${minute} ${period}`.trim();
    return TimeAdapter.formatTime(time, {
      format
    });
  }
  setDefaultTime(time, format) {
    const defaultTime = TimeAdapter.parseTime(time, {
      format
    }).toJSDate();
    if (DateTime.fromJSDate(defaultTime).isValid) {
      const period = time.substr(time.length - 2).toUpperCase();
      const hour = defaultTime.getHours();
      this.hour = Object.assign(Object.assign({}, DEFAULT_HOUR), {
        time: formatHourByPeriod(hour, period)
      });
      this.minute = Object.assign(Object.assign({}, DEFAULT_MINUTE), {
        time: defaultTime.getMinutes()
      });
      this.period = period;
    } else {
      this.resetTime();
    }
  }
  resetTime() {
    this.hour = Object.assign({}, DEFAULT_HOUR);
    this.minute = Object.assign({}, DEFAULT_MINUTE);
    this.period = TimePeriod.AM;
  }
};
NgxMaterialTimepickerService.ɵfac = function NgxMaterialTimepickerService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerService)();
};
NgxMaterialTimepickerService.ɵprov = ɵɵdefineInjectable({
  token: NgxMaterialTimepickerService,
  factory: NgxMaterialTimepickerService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function formatHourByPeriod(hour, period) {
  switch (period) {
    case TimePeriod.AM:
      return hour === 0 ? 12 : hour;
    case TimePeriod.PM:
      return hour === 12 ? 12 : hour - 12;
    default:
      return hour;
  }
}
var TIME_LOCALE = new InjectionToken("TimeLocale", {
  providedIn: "root",
  factory: () => TimeAdapter.DEFAULT_LOCALE
});
var NUMBERING_SYSTEM = new InjectionToken("NumberingSystem", {
  providedIn: "root",
  factory: () => TimeAdapter.DEFAULT_NUMBERING_SYSTEM
});
var NgxMaterialTimepickerEventService = class {
  constructor() {
    this.backdropClickSubject = new Subject();
    this.keydownEventSubject = new Subject();
  }
  get backdropClick() {
    return this.backdropClickSubject.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  get keydownEvent() {
    return this.keydownEventSubject.asObservable().pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }
  dispatchEvent(event) {
    switch (event.type) {
      case "click":
        this.backdropClickSubject.next(event);
        break;
      case "keydown":
        this.keydownEventSubject.next(event);
        break;
      default:
        throw new Error("no such event type");
    }
  }
};
NgxMaterialTimepickerEventService.ɵfac = function NgxMaterialTimepickerEventService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerEventService)();
};
NgxMaterialTimepickerEventService.ɵprov = ɵɵdefineInjectable({
  token: NgxMaterialTimepickerEventService,
  factory: NgxMaterialTimepickerEventService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerEventService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var AppendToInputDirective = class {
  constructor(elementRef, renderer) {
    this.renderer = renderer;
    this.element = elementRef.nativeElement;
  }
  get inputCords() {
    return this.inputElement.getBoundingClientRect();
  }
  get direction() {
    const height = this.element.offsetHeight;
    const {
      bottom,
      top
    } = this._inputCords;
    const isElementFit = (window && window.innerHeight) - bottom < height;
    const isTop = isElementFit && top > height;
    const isCenter = isElementFit && top < height;
    if (isTop) {
      return "top";
    } else if (isCenter) {
      return "center";
    }
    return "bottom";
  }
  ngAfterViewInit() {
    this._inputCords = this.inputCords;
    this._direction = this.direction;
    this.append();
  }
  changePosition() {
    const {
      bottom,
      top
    } = this.inputCords;
    const y = this.defineElementYByDirection(top, bottom);
    this.setStyle("top", `${y}px`);
  }
  append() {
    const {
      left,
      bottom,
      top
    } = this._inputCords;
    const y = this.defineElementYByDirection(top, bottom);
    this.setStyle("position", "fixed");
    this.setStyle("left", `${left}px`);
    this.setStyle("top", `${y}px`);
  }
  setStyle(style2, value) {
    this.renderer.setStyle(this.element, style2, value);
  }
  defineElementYByDirection(inputTop, inputBottom) {
    if (this._direction === "top") {
      return inputTop - this.element.offsetHeight;
    } else if (this._direction === "center") {
      return inputTop - this.element.offsetHeight / 2;
    }
    return inputBottom;
  }
};
AppendToInputDirective.ɵfac = function AppendToInputDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AppendToInputDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
};
AppendToInputDirective.ɵdir = ɵɵdefineDirective({
  type: AppendToInputDirective,
  selectors: [["", "ngxAppendToInput", ""]],
  hostBindings: function AppendToInputDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("scroll", function AppendToInputDirective_scroll_HostBindingHandler() {
        return ctx.changePosition();
      }, ɵɵresolveWindow);
    }
  },
  inputs: {
    inputElement: [0, "ngxAppendToInput", "inputElement"]
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppendToInputDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxAppendToInput]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }];
  }, {
    inputElement: [{
      type: Input,
      args: ["ngxAppendToInput"]
    }],
    changePosition: [{
      type: HostListener,
      args: ["window:scroll"]
    }]
  });
})();
var NgxMaterialTimepickerContentComponent = class {
};
NgxMaterialTimepickerContentComponent.ɵfac = function NgxMaterialTimepickerContentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerContentComponent)();
};
NgxMaterialTimepickerContentComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerContentComponent,
  selectors: [["ngx-material-timepicker-content"]],
  inputs: {
    appendToInput: "appendToInput",
    inputElement: "inputElement"
  },
  standalone: false,
  ngContentSelectors: _c0,
  decls: 5,
  vars: 2,
  consts: [["timepickerModal", ""], ["timepickerOutlet", ""], [3, "ngxAppendToInput", 4, "ngIf", "ngIfElse"], [3, "ngxAppendToInput"], [4, "ngTemplateOutlet"]],
  template: function NgxMaterialTimepickerContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵtemplate(0, NgxMaterialTimepickerContentComponent_div_0_Template, 2, 2, "div", 2)(1, NgxMaterialTimepickerContentComponent_ng_template_1_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor)(3, NgxMaterialTimepickerContentComponent_ng_template_3_Template, 1, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const timepickerModal_r3 = ɵɵreference(2);
      ɵɵproperty("ngIf", ctx.appendToInput)("ngIfElse", timepickerModal_r3);
    }
  },
  dependencies: [NgIf, AppendToInputDirective, NgTemplateOutlet],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerContentComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-content",
      templateUrl: "./ngx-material-timepicker-content.component.html"
    }]
  }], null, {
    appendToInput: [{
      type: Input
    }],
    inputElement: [{
      type: Input
    }]
  });
})();
var TimepickerTimeUtils = class {
  static getHours(format) {
    return Array(format).fill(1).map((v, i) => {
      const angleStep = 30;
      const time = v + i;
      const angle = angleStep * time;
      return {
        time: time === 24 ? 0 : time,
        angle
      };
    });
  }
  static disableHours(hours, config) {
    if (config.min || config.max) {
      return hours.map((value) => {
        const hour = config.format === 24 ? value.time : TimeAdapter.formatHour(value.time, config.format, config.period);
        const currentTime = DateTime.fromObject({
          hour
        }).toFormat(TimeFormat.TWELVE);
        return Object.assign(Object.assign({}, value), {
          disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, "hours")
        });
      });
    }
    return hours;
  }
  static getMinutes(gap = 1) {
    const minutesCount = 60;
    const angleStep = 360 / minutesCount;
    const minutes = [];
    for (let i = 0; i < minutesCount; i++) {
      const angle = angleStep * i;
      if (i % gap === 0) {
        minutes.push({
          time: i,
          angle: angle !== 0 ? angle : 360
        });
      }
    }
    return minutes;
  }
  static disableMinutes(minutes, selectedHour, config) {
    if (config.min || config.max) {
      const hour = TimeAdapter.formatHour(selectedHour, config.format, config.period);
      return minutes.map((value) => {
        const currentTime = DateTime.fromObject({
          hour,
          minute: value.time
        }).toFormat(TimeFormat.TWELVE);
        return Object.assign(Object.assign({}, value), {
          disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, "minutes")
        });
      });
    }
    return minutes;
  }
};
var TimeLocalizerPipe = class {
  constructor(locale) {
    this.locale = locale;
  }
  transform(time, timeUnit, isKeyboardEnabled = false) {
    if (time == null || time === "") {
      return "";
    }
    switch (timeUnit) {
      case TimeUnit.HOUR: {
        const format = time === 0 || isKeyboardEnabled ? "HH" : "H";
        return this.formatTime("hour", time, format);
      }
      case TimeUnit.MINUTE:
        return this.formatTime("minute", time, "mm");
      default:
        throw new Error(`There is no Time Unit with type ${timeUnit}`);
    }
  }
  formatTime(timeMeasure, time, format) {
    try {
      return DateTime.fromObject({
        [timeMeasure]: +time
      }).setLocale(this.locale).toFormat(format);
    } catch (_a) {
      throw new Error(`Cannot format provided time - ${time} to locale - ${this.locale}`);
    }
  }
};
TimeLocalizerPipe.ɵfac = function TimeLocalizerPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TimeLocalizerPipe)(ɵɵdirectiveInject(TIME_LOCALE, 16));
};
TimeLocalizerPipe.ɵpipe = ɵɵdefinePipe({
  name: "timeLocalizer",
  type: TimeLocalizerPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeLocalizerPipe, [{
    type: Pipe,
    args: [{
      name: "timeLocalizer"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TIME_LOCALE]
      }]
    }];
  }, null);
})();
var TimeParserPipe = class {
  constructor(locale, numberingSystem) {
    this.locale = locale;
    this.numberingSystem = numberingSystem;
  }
  transform(time, timeUnit = TimeUnit.HOUR) {
    if (time == null || time === "") {
      return "";
    }
    if (!isNaN(+time)) {
      return time;
    }
    if (timeUnit === TimeUnit.MINUTE) {
      return this.parseTime(time, "m", "minute");
    }
    return this.parseTime(time, "H", "hour");
  }
  parseTime(time, format, timeMeasure) {
    const parsedTime = DateTime.fromFormat(String(time), format, {
      numberingSystem: this.numberingSystem,
      locale: this.locale
    })[timeMeasure];
    if (!isNaN(parsedTime)) {
      return parsedTime;
    }
    throw new Error(`Cannot parse time - ${time}`);
  }
};
TimeParserPipe.ɵfac = function TimeParserPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TimeParserPipe)(ɵɵdirectiveInject(TIME_LOCALE, 16), ɵɵdirectiveInject(NUMBERING_SYSTEM, 16));
};
TimeParserPipe.ɵpipe = ɵɵdefinePipe({
  name: "timeParser",
  type: TimeParserPipe,
  pure: true,
  standalone: false
});
TimeParserPipe.ɵprov = ɵɵdefineInjectable({
  token: TimeParserPipe,
  factory: TimeParserPipe.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeParserPipe, [{
    type: Pipe,
    args: [{
      name: "timeParser"
    }]
  }, {
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TIME_LOCALE]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [NUMBERING_SYSTEM]
      }]
    }];
  }, null);
})();
var AutofocusDirective = class {
  constructor(element, document) {
    this.element = element;
    this.document = document;
    this.activeElement = this.document.activeElement;
  }
  ngOnChanges() {
    if (this.isFocusActive) {
      setTimeout(() => this.element.nativeElement.focus({
        preventScroll: true
      }));
    }
  }
  ngOnDestroy() {
    setTimeout(() => this.activeElement.focus({
      preventScroll: true
    }));
  }
};
AutofocusDirective.ɵfac = function AutofocusDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || AutofocusDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(DOCUMENT, 8));
};
AutofocusDirective.ɵdir = ɵɵdefineDirective({
  type: AutofocusDirective,
  selectors: [["", "timepickerAutofocus", ""]],
  inputs: {
    isFocusActive: [0, "timepickerAutofocus", "isFocusActive"]
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutofocusDirective, [{
    type: Directive,
    args: [{
      selector: "[timepickerAutofocus]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, {
    isFocusActive: [{
      type: Input,
      args: ["timepickerAutofocus"]
    }]
  });
})();
var NgxMaterialTimepickerDialControlComponent = class {
  constructor(timeParserPipe, timeLocalizerPipe) {
    this.timeParserPipe = timeParserPipe;
    this.timeLocalizerPipe = timeLocalizerPipe;
    this.timeUnitChanged = new EventEmitter();
    this.timeChanged = new EventEmitter();
    this.focused = new EventEmitter();
    this.unfocused = new EventEmitter();
  }
  get selectedTime() {
    if (!!this.time) {
      return this.timeList.find((t) => t.time === +this.time);
    }
  }
  ngOnInit() {
    if (this.isEditable) {
      this.timeControl = new FormControl({
        value: this.formatTimeForUI(this.time),
        disabled: this.disabled
      });
      this.timeControl.valueChanges.pipe(tap((value) => {
        if (value.length > 2) {
          this.updateInputValue(value.slice(-1));
        }
      }), debounceTime(500), distinctUntilChanged(), filter((value) => !isTimeDisabledToChange(this.time, value, this.timeList)), tap((value) => this.time = this.timeParserPipe.transform(value, this.timeUnit).toString())).subscribe(() => this.updateTime());
    }
  }
  saveTimeAndChangeTimeUnit(event, unit) {
    event.preventDefault();
    this.previousTime = this.time;
    this.timeUnitChanged.next(unit);
    this.focused.next();
  }
  updateTime() {
    const time = this.selectedTime;
    if (time) {
      this.timeChanged.next(time);
      this.previousTime = time.time;
      if (this.isEditable) {
        this.updateInputValue(this.formatTimeForUI(time.time));
      }
    }
  }
  onKeydown(e) {
    if (!isDigit(e)) {
      e.preventDefault();
    } else {
      this.changeTimeByArrow(e.keyCode);
    }
  }
  changeTimeByArrow(keyCode) {
    const ARROW_UP = 38;
    const ARROW_DOWN = 40;
    let time;
    if (keyCode === ARROW_UP) {
      time = String(+this.time + (this.minutesGap || 1));
    } else if (keyCode === ARROW_DOWN) {
      time = String(+this.time - (this.minutesGap || 1));
    }
    if (!isTimeUnavailable(time, this.timeList)) {
      this.time = time;
      this.updateTime();
    }
  }
  formatTimeForUI(value) {
    const parsedTime = this.timeParserPipe.transform(value, this.timeUnit).toString();
    return this.timeLocalizerPipe.transform(parsedTime, this.timeUnit, true);
  }
  updateInputValue(value) {
    this.editableTimeTmpl.nativeElement.value = value;
  }
};
NgxMaterialTimepickerDialControlComponent.ɵfac = function NgxMaterialTimepickerDialControlComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerDialControlComponent)(ɵɵdirectiveInject(TimeParserPipe), ɵɵdirectiveInject(TimeLocalizerPipe));
};
NgxMaterialTimepickerDialControlComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerDialControlComponent,
  selectors: [["ngx-material-timepicker-dial-control"]],
  viewQuery: function NgxMaterialTimepickerDialControlComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.editableTimeTmpl = _t.first);
    }
  },
  inputs: {
    timeList: "timeList",
    timeUnit: "timeUnit",
    time: "time",
    isActive: "isActive",
    isEditable: "isEditable",
    minutesGap: "minutesGap",
    disabled: "disabled"
  },
  outputs: {
    timeUnitChanged: "timeUnitChanged",
    timeChanged: "timeChanged",
    focused: "focused",
    unfocused: "unfocused"
  },
  standalone: false,
  features: [ɵɵProvidersFeature([TimeParserPipe, TimeLocalizerPipe])],
  decls: 3,
  vars: 2,
  consts: [["editableTemplate", ""], ["editableTimeTmpl", ""], ["class", "timepicker-dial__control timepicker-dial__item", "readonly", "", 3, "ngClass", "ngModel", "disabled", "timepickerAutofocus", "ngModelChange", "input", "focus", 4, "ngIf", "ngIfElse"], ["readonly", "", 1, "timepicker-dial__control", "timepicker-dial__item", 3, "ngModelChange", "input", "focus", "ngClass", "ngModel", "disabled", "timepickerAutofocus"], [1, "timepicker-dial__control", "timepicker-dial__item", "timepicker-dial__control_editable", 3, "focus", "keydown", "formControl", "ngClass", "timepickerAutofocus"]],
  template: function NgxMaterialTimepickerDialControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NgxMaterialTimepickerDialControlComponent_input_0_Template, 2, 9, "input", 2)(1, NgxMaterialTimepickerDialControlComponent_ng_template_1_Template, 2, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const editableTemplate_r4 = ɵɵreference(2);
      ɵɵproperty("ngIf", !ctx.isEditable)("ngIfElse", editableTemplate_r4);
    }
  },
  dependencies: [NgIf, DefaultValueAccessor, NgClass, NgControlStatus, NgModel, AutofocusDirective, FormControlDirective, TimeLocalizerPipe],
  styles: ['.timepicker-dial__item[_ngcontent-%COMP%]{cursor:pointer;color:#ffffff80;font-family:"Roboto",sans-serif}@supports (font-family: var(--primary-font-family)){.timepicker-dial__item[_ngcontent-%COMP%]{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active[_ngcontent-%COMP%]{color:#fff}@supports (color: var(--dial-active-color)){.timepicker-dial__item_active[_ngcontent-%COMP%]{color:var(--dial-active-color)}}.timepicker-dial__control[_ngcontent-%COMP%]{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px;text-align:right}.timepicker-dial__control_editable[_ngcontent-%COMP%]:focus{color:#00bfff;background-color:#fff;outline:deepskyblue}@supports (color: var(--dial-editable-active-color)){.timepicker-dial__control_editable[_ngcontent-%COMP%]:focus{color:var(--dial-editable-active-color)}}@supports (background-color: var(--dial-editable-background-color)){.timepicker-dial__control_editable[_ngcontent-%COMP%]:focus{background-color:var(--dial-editable-background-color)}}@supports (outline: var(--dial-editable-active-color)){.timepicker-dial__control_editable[_ngcontent-%COMP%]:focus{outline:var(--dial-editable-active-color)}}.timepicker-dial__control[_ngcontent-%COMP%]:disabled{cursor:default}.timepicker-dial__control[_ngcontent-%COMP%]:focus-visible{outline:none}']
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerDialControlComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-dial-control",
      templateUrl: "ngx-material-timepicker-dial-control.component.html",
      styleUrls: ["ngx-material-timepicker-dial-control.component.scss"],
      providers: [TimeParserPipe, TimeLocalizerPipe]
    }]
  }], function() {
    return [{
      type: TimeParserPipe
    }, {
      type: TimeLocalizerPipe
    }];
  }, {
    timeList: [{
      type: Input
    }],
    timeUnit: [{
      type: Input
    }],
    time: [{
      type: Input
    }],
    isActive: [{
      type: Input
    }],
    isEditable: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    editableTimeTmpl: [{
      type: ViewChild,
      args: ["editableTimeTmpl"]
    }],
    timeUnitChanged: [{
      type: Output
    }],
    timeChanged: [{
      type: Output
    }],
    focused: [{
      type: Output
    }],
    unfocused: [{
      type: Output
    }]
  });
})();
function isTimeDisabledToChange(currentTime, nextTime, timeList) {
  const isNumber2 = /\d/.test(nextTime);
  if (isNumber2) {
    return isTimeUnavailable(nextTime, timeList);
  }
}
function isTimeUnavailable(time, timeList) {
  const selectedTime = timeList.find((value) => value.time === +time);
  return !selectedTime || selectedTime && selectedTime.disabled;
}
var NgxMaterialTimepickerPeriodComponent = class {
  constructor() {
    this.timePeriod = TimePeriod;
    this.isPeriodAvailable = true;
    this.periodChanged = new EventEmitter();
  }
  changePeriod(period) {
    this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
    if (this.isPeriodAvailable) {
      this.periodChanged.next(period);
    }
  }
  animationDone() {
    this.isPeriodAvailable = true;
  }
  isSwitchPeriodAvailable(period) {
    const time = this.getDisabledTimeByPeriod(period);
    return !time.every((t) => t.disabled);
  }
  getDisabledTimeByPeriod(period) {
    switch (this.activeTimeUnit) {
      case TimeUnit.HOUR:
        return TimepickerTimeUtils.disableHours(this.hours, {
          min: this.minTime,
          max: this.maxTime,
          format: this.format,
          period
        });
      case TimeUnit.MINUTE:
        return TimepickerTimeUtils.disableMinutes(this.minutes, +this.selectedHour, {
          min: this.minTime,
          max: this.maxTime,
          format: this.format,
          period
        });
      default:
        throw new Error("no such TimeUnit");
    }
  }
};
NgxMaterialTimepickerPeriodComponent.ɵfac = function NgxMaterialTimepickerPeriodComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerPeriodComponent)();
};
NgxMaterialTimepickerPeriodComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerPeriodComponent,
  selectors: [["ngx-material-timepicker-period"]],
  inputs: {
    selectedPeriod: "selectedPeriod",
    format: "format",
    activeTimeUnit: "activeTimeUnit",
    hours: "hours",
    minutes: "minutes",
    minTime: "minTime",
    maxTime: "maxTime",
    selectedHour: "selectedHour",
    meridiems: "meridiems"
  },
  outputs: {
    periodChanged: "periodChanged"
  },
  standalone: false,
  decls: 6,
  vars: 9,
  consts: [[1, "timepicker-period"], ["type", "button", 1, "timepicker-dial__item", "timepicker-period__btn", 3, "click", "ngClass"], ["class", "timepicker-period__warning", 4, "ngIf"], [1, "timepicker-period__warning"]],
  template: function NgxMaterialTimepickerPeriodComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "button", 1);
      ɵɵlistener("click", function NgxMaterialTimepickerPeriodComponent_Template_button_click_1_listener() {
        return ctx.changePeriod(ctx.timePeriod.AM);
      });
      ɵɵtext(2);
      ɵɵelementEnd();
      ɵɵelementStart(3, "button", 1);
      ɵɵlistener("click", function NgxMaterialTimepickerPeriodComponent_Template_button_click_3_listener() {
        return ctx.changePeriod(ctx.timePeriod.PM);
      });
      ɵɵtext(4);
      ɵɵelementEnd();
      ɵɵtemplate(5, NgxMaterialTimepickerPeriodComponent_div_5_Template, 3, 1, "div", 2);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(5, _c2, ctx.selectedPeriod === ctx.timePeriod.AM));
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.meridiems[0]);
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(7, _c2, ctx.selectedPeriod === ctx.timePeriod.PM));
      ɵɵadvance();
      ɵɵtextInterpolate(ctx.meridiems[1]);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.isPeriodAvailable);
    }
  },
  dependencies: [NgClass, NgIf],
  styles: ['.timepicker-dial__item[_ngcontent-%COMP%]{cursor:pointer;color:#ffffff80;font-family:"Roboto",sans-serif}@supports (font-family: var(--primary-font-family)){.timepicker-dial__item[_ngcontent-%COMP%]{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active[_ngcontent-%COMP%]{color:#fff}@supports (color: var(--dial-active-color)){.timepicker-dial__item_active[_ngcontent-%COMP%]{color:var(--dial-active-color)}}.timepicker-period[_ngcontent-%COMP%]{display:flex;flex-direction:column;position:relative}.timepicker-period__btn[_ngcontent-%COMP%]{padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;-moz-user-select:none;user-select:none;outline:none;border-radius:3px;transition:background-color .5s;font-family:"Roboto",sans-serif}@supports (font-family: var(--primary-font-family)){.timepicker-period__btn[_ngcontent-%COMP%]{font-family:var(--primary-font-family)}}.timepicker-period__btn[_ngcontent-%COMP%]:focus{background-color:#00000012}.timepicker-period__warning[_ngcontent-%COMP%]{padding:5px 10px;border-radius:3px;background-color:#0000008c;color:#fff;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{margin:0;font-size:12px;font-family:"Roboto",sans-serif}@supports (font-family: var(--primary-font-family)){.timepicker-period__warning[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{font-family:var(--primary-font-family)}}'],
  data: {
    animation: [trigger("scaleInOut", [transition(":enter", [style({
      transform: "scale(0)"
    }), animate(".2s", style({
      transform: "scale(1)"
    })), sequence([animate("3s", style({
      opacity: 1
    })), animate(".3s", style({
      opacity: 0
    }))])])])]
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerPeriodComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-period",
      templateUrl: "ngx-material-timepicker-period.component.html",
      styleUrls: ["ngx-material-timepicker-period.component.scss"],
      animations: [trigger("scaleInOut", [transition(":enter", [style({
        transform: "scale(0)"
      }), animate(".2s", style({
        transform: "scale(1)"
      })), sequence([animate("3s", style({
        opacity: 1
      })), animate(".3s", style({
        opacity: 0
      }))])])])]
    }]
  }], null, {
    selectedPeriod: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    activeTimeUnit: [{
      type: Input
    }],
    hours: [{
      type: Input
    }],
    minutes: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    selectedHour: [{
      type: Input
    }],
    meridiems: [{
      type: Input
    }],
    periodChanged: [{
      type: Output
    }]
  });
})();
var NgxMaterialTimepickerDialComponent = class {
  constructor(locale) {
    this.locale = locale;
    this.timeUnit = TimeUnit;
    this.meridiems = Info.meridiems({
      locale: this.locale
    });
    this.periodChanged = new EventEmitter();
    this.timeUnitChanged = new EventEmitter();
    this.hourChanged = new EventEmitter();
    this.minuteChanged = new EventEmitter();
  }
  ngOnChanges(changes) {
    if (changes["period"] && changes["period"].currentValue || changes["format"] && changes["format"].currentValue) {
      const hours = TimepickerTimeUtils.getHours(this.format);
      this.hours = TimepickerTimeUtils.disableHours(hours, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
    if (changes["period"] && changes["period"].currentValue || changes["hour"] && changes["hour"].currentValue) {
      const minutes = TimepickerTimeUtils.getMinutes(this.minutesGap);
      this.minutes = TimepickerTimeUtils.disableMinutes(minutes, +this.hour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
  changeTimeUnit(unit) {
    this.timeUnitChanged.next(unit);
  }
  changePeriod(period) {
    this.periodChanged.next(period);
  }
  changeHour(hour) {
    this.hourChanged.next(hour);
    if (this.isEditable) {
      this.changeTimeUnit(TimeUnit.MINUTE);
    }
  }
  changeMinute(minute) {
    this.minuteChanged.next(minute);
  }
  showHint() {
    this.isHintVisible = true;
  }
  hideHint() {
    this.isHintVisible = false;
  }
};
NgxMaterialTimepickerDialComponent.ɵfac = function NgxMaterialTimepickerDialComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerDialComponent)(ɵɵdirectiveInject(TIME_LOCALE));
};
NgxMaterialTimepickerDialComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerDialComponent,
  selectors: [["ngx-material-timepicker-dial"]],
  inputs: {
    editableHintTmpl: "editableHintTmpl",
    hour: "hour",
    minute: "minute",
    format: "format",
    period: "period",
    activeTimeUnit: "activeTimeUnit",
    minTime: "minTime",
    maxTime: "maxTime",
    isEditable: "isEditable",
    minutesGap: "minutesGap",
    hoursOnly: "hoursOnly"
  },
  outputs: {
    periodChanged: "periodChanged",
    timeUnitChanged: "timeUnitChanged",
    hourChanged: "hourChanged",
    minuteChanged: "minuteChanged"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature],
  decls: 9,
  vars: 25,
  consts: [["editableHintDefault", ""], [1, "timepicker-dial"], [1, "timepicker-dial__container"], [1, "timepicker-dial__time"], [3, "timeUnitChanged", "timeChanged", "focused", "unfocused", "timeList", "time", "timeUnit", "isActive", "isEditable"], [3, "timeUnitChanged", "timeChanged", "focused", "unfocused", "timeList", "time", "timeUnit", "isActive", "isEditable", "minutesGap", "disabled"], [1, "timepicker-dial__period", 3, "periodChanged", "ngClass", "selectedPeriod", "activeTimeUnit", "maxTime", "minTime", "format", "hours", "minutes", "selectedHour", "meridiems"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"], [4, "ngTemplateOutlet"], [1, "timepicker-dial__hint"]],
  template: function NgxMaterialTimepickerDialComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "ngx-material-timepicker-dial-control", 4);
      ɵɵlistener("timeUnitChanged", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_dial_control_timeUnitChanged_3_listener($event) {
        return ctx.changeTimeUnit($event);
      })("timeChanged", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_dial_control_timeChanged_3_listener($event) {
        return ctx.changeHour($event);
      })("focused", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_dial_control_focused_3_listener() {
        return ctx.showHint();
      })("unfocused", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_dial_control_unfocused_3_listener() {
        return ctx.hideHint();
      });
      ɵɵelementEnd();
      ɵɵelementStart(4, "span");
      ɵɵtext(5, ":");
      ɵɵelementEnd();
      ɵɵelementStart(6, "ngx-material-timepicker-dial-control", 5);
      ɵɵlistener("timeUnitChanged", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_dial_control_timeUnitChanged_6_listener($event) {
        return ctx.changeTimeUnit($event);
      })("timeChanged", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_dial_control_timeChanged_6_listener($event) {
        return ctx.changeMinute($event);
      })("focused", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_dial_control_focused_6_listener() {
        return ctx.showHint();
      })("unfocused", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_dial_control_unfocused_6_listener() {
        return ctx.hideHint();
      });
      ɵɵelementEnd()();
      ɵɵelementStart(7, "ngx-material-timepicker-period", 6);
      ɵɵlistener("periodChanged", function NgxMaterialTimepickerDialComponent_Template_ngx_material_timepicker_period_periodChanged_7_listener($event) {
        return ctx.changePeriod($event);
      });
      ɵɵelementEnd()();
      ɵɵtemplate(8, NgxMaterialTimepickerDialComponent_div_8_Template, 4, 4, "div", 7);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵproperty("timeList", ctx.hours)("time", ctx.hour)("timeUnit", ctx.timeUnit.HOUR)("isActive", ctx.activeTimeUnit === ctx.timeUnit.HOUR)("isEditable", ctx.isEditable);
      ɵɵadvance(3);
      ɵɵproperty("timeList", ctx.minutes)("time", ctx.minute)("timeUnit", ctx.timeUnit.MINUTE)("isActive", ctx.activeTimeUnit === ctx.timeUnit.MINUTE)("isEditable", ctx.isEditable)("minutesGap", ctx.minutesGap)("disabled", ctx.hoursOnly);
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(23, _c3, ctx.format === 24))("selectedPeriod", ctx.period)("activeTimeUnit", ctx.activeTimeUnit)("maxTime", ctx.maxTime)("minTime", ctx.minTime)("format", ctx.format)("hours", ctx.hours)("minutes", ctx.minutes)("selectedHour", ctx.hour)("meridiems", ctx.meridiems);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.isEditable || ctx.editableHintTmpl);
    }
  },
  dependencies: [NgxMaterialTimepickerDialControlComponent, NgxMaterialTimepickerPeriodComponent, NgClass, NgIf, NgTemplateOutlet],
  styles: ['.timepicker-dial[_ngcontent-%COMP%]{text-align:right}.timepicker-dial__container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-end;-webkit-tap-highlight-color:rgba(0,0,0,0)}.timepicker-dial__time[_ngcontent-%COMP%]{display:flex;align-items:baseline;line-height:normal;font-size:50px;color:#ffffff80;font-family:"Roboto",sans-serif}@supports (font-family: var(--primary-font-family)){.timepicker-dial__time[_ngcontent-%COMP%]{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__period[_ngcontent-%COMP%]{display:block;margin-left:10px}.timepicker-dial__period--hidden[_ngcontent-%COMP%]{visibility:hidden}.timepicker-dial__hint-container--hidden[_ngcontent-%COMP%]{visibility:hidden}.timepicker-dial__hint[_ngcontent-%COMP%]{display:inline-block;font-size:10px;color:#fff}@supports (color: var(--dial-active-color)){.timepicker-dial__hint[_ngcontent-%COMP%]{color:var(--dial-active-color)}}.timepicker-dial__hint[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px}@media (max-device-width: 1023px) and (orientation: landscape){.timepicker-dial__container[_ngcontent-%COMP%]{flex-direction:column}.timepicker-dial__period[_ngcontent-%COMP%]{margin-left:0}}'],
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerDialComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-dial",
      templateUrl: "ngx-material-timepicker-dial.component.html",
      styleUrls: ["ngx-material-timepicker-dial.component.scss"],
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TIME_LOCALE]
      }]
    }];
  }, {
    editableHintTmpl: [{
      type: Input
    }],
    hour: [{
      type: Input
    }],
    minute: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    period: [{
      type: Input
    }],
    activeTimeUnit: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    isEditable: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    hoursOnly: [{
      type: Input
    }],
    periodChanged: [{
      type: Output
    }],
    timeUnitChanged: [{
      type: Output
    }],
    hourChanged: [{
      type: Output
    }],
    minuteChanged: [{
      type: Output
    }]
  });
})();
var NgxMaterialTimepickerHoursFace = class {
  constructor(format) {
    this.hourChange = new EventEmitter();
    this.hourSelected = new EventEmitter();
    this.hoursList = [];
    this.hoursList = TimepickerTimeUtils.getHours(format);
  }
  onTimeSelected(time) {
    this.hourSelected.next(time);
  }
};
NgxMaterialTimepickerHoursFace.ɵfac = function NgxMaterialTimepickerHoursFace_Factory(__ngFactoryType__) {
  ɵɵinvalidFactory();
};
NgxMaterialTimepickerHoursFace.ɵdir = ɵɵdefineDirective({
  type: NgxMaterialTimepickerHoursFace,
  inputs: {
    selectedHour: "selectedHour",
    minTime: "minTime",
    maxTime: "maxTime",
    format: "format"
  },
  outputs: {
    hourChange: "hourChange",
    hourSelected: "hourSelected"
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerHoursFace, [{
    type: Directive
  }], function() {
    return [{
      type: void 0
    }];
  }, {
    selectedHour: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    hourChange: [{
      type: Output
    }],
    hourSelected: [{
      type: Output
    }]
  });
})();
var ActiveHourPipe = class {
  transform(hour, currentHour, isClockFaceDisabled) {
    if (hour == null || isClockFaceDisabled) {
      return false;
    }
    return hour === currentHour;
  }
};
ActiveHourPipe.ɵfac = function ActiveHourPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ActiveHourPipe)();
};
ActiveHourPipe.ɵpipe = ɵɵdefinePipe({
  name: "activeHour",
  type: ActiveHourPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ActiveHourPipe, [{
    type: Pipe,
    args: [{
      name: "activeHour"
    }]
  }], null, null);
})();
var ActiveMinutePipe = class {
  transform(minute, currentMinute, gap, isClockFaceDisabled) {
    if (minute == null || isClockFaceDisabled) {
      return false;
    }
    const defaultGap = 5;
    return currentMinute === minute && minute % (gap || defaultGap) === 0;
  }
};
ActiveMinutePipe.ɵfac = function ActiveMinutePipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || ActiveMinutePipe)();
};
ActiveMinutePipe.ɵpipe = ɵɵdefinePipe({
  name: "activeMinute",
  type: ActiveMinutePipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ActiveMinutePipe, [{
    type: Pipe,
    args: [{
      name: "activeMinute"
    }]
  }], null, null);
})();
var MinutesFormatterPipe = class {
  transform(minute, gap = 5) {
    if (!minute) {
      return minute;
    }
    return minute % gap === 0 ? minute : "";
  }
};
MinutesFormatterPipe.ɵfac = function MinutesFormatterPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MinutesFormatterPipe)();
};
MinutesFormatterPipe.ɵpipe = ɵɵdefinePipe({
  name: "minutesFormatter",
  type: MinutesFormatterPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MinutesFormatterPipe, [{
    type: Pipe,
    args: [{
      name: "minutesFormatter"
    }]
  }], null, null);
})();
var CLOCK_HAND_STYLES = {
  small: {
    height: "75px",
    top: "calc(50% - 75px)"
  },
  large: {
    height: "103px",
    top: "calc(50% - 103px)"
  }
};
var NgxMaterialTimepickerFaceComponent = class {
  constructor() {
    this.timeUnit = TimeUnit;
    this.innerClockFaceSize = 85;
    this.timeChange = new EventEmitter();
    this.timeSelected = new EventEmitter();
  }
  ngAfterViewInit() {
    this.setClockHandPosition();
    this.addTouchEvents();
  }
  ngOnChanges(changes) {
    const faceTimeChanges = changes["faceTime"];
    const selectedTimeChanges = changes["selectedTime"];
    if (faceTimeChanges && faceTimeChanges.currentValue && selectedTimeChanges && selectedTimeChanges.currentValue) {
      this.selectedTime = this.faceTime.find((time) => time.time === this.selectedTime.time);
    }
    if (selectedTimeChanges && selectedTimeChanges.currentValue) {
      this.setClockHandPosition();
    }
    if (faceTimeChanges && faceTimeChanges.currentValue) {
      setTimeout(() => this.selectAvailableTime());
    }
  }
  trackByTime(_, time) {
    return time.time;
  }
  onMousedown(e) {
    e.preventDefault();
    this.isStarted = true;
  }
  selectTime(e) {
    if (!this.isStarted && e instanceof MouseEvent && e.type !== "click") {
      return;
    }
    const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
    const centerX = clockFaceCords.left + clockFaceCords.width / 2;
    const centerY = clockFaceCords.top + clockFaceCords.height / 2;
    const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
    const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
    const isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
    const angleStep = this.unit === TimeUnit.MINUTE ? 6 * (this.minutesGap || 1) : 30;
    const roundedAngle = roundAngle(circleAngle, angleStep);
    const angle = (roundedAngle || 360) + (isInnerClockChosen ? 360 : 0);
    const selectedTime = this.faceTime.find((val) => val.angle === angle);
    if (selectedTime && !selectedTime.disabled) {
      this.timeChange.next(selectedTime);
      if (!this.isStarted) {
        this.timeSelected.next(selectedTime.time);
      }
    }
  }
  onMouseup(e) {
    e.preventDefault();
    this.isStarted = false;
  }
  ngOnDestroy() {
    this.removeTouchEvents();
  }
  addTouchEvents() {
    this.touchStartHandler = this.onMousedown.bind(this);
    this.touchEndHandler = this.onMouseup.bind(this);
    this.clockFace.nativeElement.addEventListener("touchstart", this.touchStartHandler);
    this.clockFace.nativeElement.addEventListener("touchend", this.touchEndHandler);
  }
  removeTouchEvents() {
    this.clockFace.nativeElement.removeEventListener("touchstart", this.touchStartHandler);
    this.clockFace.nativeElement.removeEventListener("touchend", this.touchEndHandler);
  }
  setClockHandPosition() {
    if (this.format === 24) {
      if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
        this.decreaseClockHand();
      } else {
        this.increaseClockHand();
      }
    }
    this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
  }
  selectAvailableTime() {
    const currentTime = this.faceTime.find((time) => this.selectedTime.time === time.time);
    this.isClockFaceDisabled = this.faceTime.every((time) => time.disabled);
    if (currentTime && currentTime.disabled && !this.isClockFaceDisabled) {
      const availableTime = this.faceTime.find((time) => !time.disabled);
      this.timeChange.next(availableTime);
    }
  }
  isInnerClockFace(x0, y0, x, y) {
    return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
  }
  decreaseClockHand() {
    this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
    this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
  }
  increaseClockHand() {
    this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
    this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
  }
};
NgxMaterialTimepickerFaceComponent.ɵfac = function NgxMaterialTimepickerFaceComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerFaceComponent)();
};
NgxMaterialTimepickerFaceComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerFaceComponent,
  selectors: [["ngx-material-timepicker-face"]],
  viewQuery: function NgxMaterialTimepickerFaceComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c5, 7);
      ɵɵviewQuery(_c6, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clockFace = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.clockHand = _t.first);
    }
  },
  hostBindings: function NgxMaterialTimepickerFaceComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("mousedown", function NgxMaterialTimepickerFaceComponent_mousedown_HostBindingHandler($event) {
        return ctx.onMousedown($event);
      })("click", function NgxMaterialTimepickerFaceComponent_click_HostBindingHandler($event) {
        return ctx.selectTime($event);
      })("touchmove", function NgxMaterialTimepickerFaceComponent_touchmove_HostBindingHandler($event) {
        return ctx.selectTime($event.changedTouches[0]);
      })("touchend", function NgxMaterialTimepickerFaceComponent_touchend_HostBindingHandler($event) {
        return ctx.selectTime($event.changedTouches[0]);
      })("mousemove", function NgxMaterialTimepickerFaceComponent_mousemove_HostBindingHandler($event) {
        return ctx.selectTime($event);
      })("mouseup", function NgxMaterialTimepickerFaceComponent_mouseup_HostBindingHandler($event) {
        return ctx.onMouseup($event);
      });
    }
  },
  inputs: {
    faceTime: "faceTime",
    selectedTime: "selectedTime",
    unit: "unit",
    format: "format",
    minutesGap: "minutesGap"
  },
  outputs: {
    timeChange: "timeChange",
    timeSelected: "timeSelected"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature],
  decls: 7,
  vars: 6,
  consts: [["clockFace", ""], ["clockHand", ""], ["minutesFace", ""], [1, "clock-face"], ["class", "clock-face__container", 4, "ngIf", "ngIfElse"], [1, "clock-face__clock-hand", 3, "ngClass", "hidden"], [1, "clock-face__container"], ["class", "clock-face__number clock-face__number--outer", 3, "ngStyle", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "clock-face__inner", 3, "top", 4, "ngIf"], [1, "clock-face__number", "clock-face__number--outer", 3, "ngStyle"], [3, "ngStyle", "ngClass"], [1, "clock-face__inner"], ["class", "clock-face__number clock-face__number--inner", 3, "ngStyle", "height", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "clock-face__number", "clock-face__number--inner", 3, "ngStyle"]],
  template: function NgxMaterialTimepickerFaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 3, 0);
      ɵɵtemplate(2, NgxMaterialTimepickerFaceComponent_div_2_Template, 4, 7, "div", 4);
      ɵɵelement(3, "span", 5, 1);
      ɵɵelementEnd();
      ɵɵtemplate(5, NgxMaterialTimepickerFaceComponent_ng_template_5_Template, 2, 2, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const minutesFace_r5 = ɵɵreference(6);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.unit !== ctx.timeUnit.MINUTE)("ngIfElse", minutesFace_r5);
      ɵɵadvance();
      ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c7, ctx.unit === ctx.timeUnit.MINUTE))("hidden", ctx.isClockFaceDisabled);
    }
  },
  dependencies: [NgIf, NgForOf, NgStyle, NgClass, SlicePipe, ActiveHourPipe, TimeLocalizerPipe, ActiveMinutePipe, MinutesFormatterPipe],
  styles: ['.clock-face[_ngcontent-%COMP%]{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;padding:20px;box-sizing:border-box;background-color:#f0f0f0}@supports (background-color: var(--clock-face-background-color)){.clock-face[_ngcontent-%COMP%]{background-color:var(--clock-face-background-color)}}.clock-face__inner[_ngcontent-%COMP%]{position:absolute}.clock-face__container[_ngcontent-%COMP%]{margin-left:-2px}.clock-face__number[_ngcontent-%COMP%]{position:absolute;transform-origin:0 100%;width:50px;text-align:center;z-index:2}.clock-face__number--outer[_ngcontent-%COMP%]{height:calc(290px / 2 - 20px)}.clock-face__number--outer[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:16px;color:#6c6c6c}@supports (color: var(--clock-face-time-inactive-color)){.clock-face__number--outer[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:14px;color:#929292}@supports (color: var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{-webkit-user-select:none;-moz-user-select:none;user-select:none;width:30px;height:30px;display:flex;justify-content:center;align-items:center;margin:auto;border-radius:50%;font-weight:500;font-family:"Roboto",sans-serif}@supports (font-family: var(--primary-font-family)){.clock-face__number[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-family:var(--primary-font-family)}}.clock-face__number[_ngcontent-%COMP%] > span.active[_ngcontent-%COMP%]{background-color:#00bfff;color:#fff}@supports (background-color: var(--clock-hand-color)){.clock-face__number[_ngcontent-%COMP%] > span.active[_ngcontent-%COMP%]{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number[_ngcontent-%COMP%] > span.disabled[_ngcontent-%COMP%]{color:#c5c5c5}@supports (color: var(--clock-face-time-disabled-color)){.clock-face__number[_ngcontent-%COMP%] > span.disabled[_ngcontent-%COMP%]{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand[_ngcontent-%COMP%]{height:103px;width:2px;transform-origin:0 100%;position:absolute;top:calc(50% - 103px);z-index:1;background-color:#00bfff}@supports (background-color: var(--clock-hand-color)){.clock-face__clock-hand[_ngcontent-%COMP%]{background-color:var(--clock-hand-color)}}.clock-face__clock-hand[_ngcontent-%COMP%]:after{content:"";width:7px;height:7px;border-radius:50%;background-color:inherit;position:absolute;bottom:-3px;left:-3.5px}.clock-face__clock-hand_minute[_ngcontent-%COMP%]:before{content:"";width:7px;height:7px;background-color:#fff;border-radius:50%;position:absolute;top:-8px;left:calc(50% - 8px);box-sizing:content-box;border-width:4px;border-style:solid;border-color:#00bfff}@supports (border-color: var(--clock-hand-color)){.clock-face__clock-hand_minute[_ngcontent-%COMP%]:before{border-color:var(--clock-hand-color)}}@media (max-device-width: 1023px) and (orientation: landscape){.clock-face[_ngcontent-%COMP%]{width:225px;height:225px;padding:5px}.clock-face__number--outer[_ngcontent-%COMP%]{height:calc(225px / 2 - 5px)}.clock-face__clock-hand_minute[_ngcontent-%COMP%]:before{top:0}}'],
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-face",
      templateUrl: "./ngx-material-timepicker-face.component.html",
      styleUrls: ["./ngx-material-timepicker-face.component.scss"],
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], null, {
    faceTime: [{
      type: Input
    }],
    selectedTime: [{
      type: Input
    }],
    unit: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    timeChange: [{
      type: Output
    }],
    timeSelected: [{
      type: Output
    }],
    clockFace: [{
      type: ViewChild,
      args: ["clockFace", {
        static: true
      }]
    }],
    clockHand: [{
      type: ViewChild,
      args: ["clockHand", {
        static: true
      }]
    }],
    onMousedown: [{
      type: HostListener,
      args: ["mousedown", ["$event"]]
    }],
    selectTime: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }, {
      type: HostListener,
      args: ["touchmove", ["$event.changedTouches[0]"]]
    }, {
      type: HostListener,
      args: ["touchend", ["$event.changedTouches[0]"]]
    }, {
      type: HostListener,
      args: ["mousemove", ["$event"]]
    }],
    onMouseup: [{
      type: HostListener,
      args: ["mouseup", ["$event"]]
    }]
  });
})();
function roundAngle(angle, step) {
  return Math.round(angle / step) * step;
}
function countAngleByCords(x0, y0, x, y, currentAngle) {
  if (y > y0 && x >= x0) {
    return 180 - currentAngle;
  } else if (y > y0 && x < x0) {
    return 180 + currentAngle;
  } else if (y < y0 && x < x0) {
    return 360 - currentAngle;
  } else {
    return currentAngle;
  }
}
var NgxMaterialTimepicker24HoursFaceComponent = class extends NgxMaterialTimepickerHoursFace {
  constructor() {
    super(24);
  }
  ngAfterContentInit() {
    this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
      min: this.minTime,
      max: this.maxTime,
      format: this.format
    });
  }
};
NgxMaterialTimepicker24HoursFaceComponent.ɵfac = function NgxMaterialTimepicker24HoursFaceComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepicker24HoursFaceComponent)();
};
NgxMaterialTimepicker24HoursFaceComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepicker24HoursFaceComponent,
  selectors: [["ngx-material-timepicker-24-hours-face"]],
  standalone: false,
  features: [ɵɵInheritDefinitionFeature],
  decls: 1,
  vars: 3,
  consts: [[3, "timeChange", "timeSelected", "selectedTime", "faceTime", "format"]],
  template: function NgxMaterialTimepicker24HoursFaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ngx-material-timepicker-face", 0);
      ɵɵlistener("timeChange", function NgxMaterialTimepicker24HoursFaceComponent_Template_ngx_material_timepicker_face_timeChange_0_listener($event) {
        return ctx.hourChange.next($event);
      })("timeSelected", function NgxMaterialTimepicker24HoursFaceComponent_Template_ngx_material_timepicker_face_timeSelected_0_listener($event) {
        return ctx.onTimeSelected($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("selectedTime", ctx.selectedHour)("faceTime", ctx.hoursList)("format", ctx.format);
    }
  },
  dependencies: [NgxMaterialTimepickerFaceComponent],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepicker24HoursFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-24-hours-face",
      templateUrl: "ngx-material-timepicker-24-hours-face.component.html",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [];
  }, null);
})();
var NgxMaterialTimepicker12HoursFaceComponent = class extends NgxMaterialTimepickerHoursFace {
  constructor() {
    super(12);
  }
  ngOnChanges(changes) {
    if (changes["period"] && changes["period"].currentValue) {
      this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
};
NgxMaterialTimepicker12HoursFaceComponent.ɵfac = function NgxMaterialTimepicker12HoursFaceComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepicker12HoursFaceComponent)();
};
NgxMaterialTimepicker12HoursFaceComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepicker12HoursFaceComponent,
  selectors: [["ngx-material-timepicker-12-hours-face"]],
  inputs: {
    period: "period"
  },
  standalone: false,
  features: [ɵɵInheritDefinitionFeature, ɵɵNgOnChangesFeature],
  decls: 1,
  vars: 2,
  consts: [[3, "timeChange", "timeSelected", "selectedTime", "faceTime"]],
  template: function NgxMaterialTimepicker12HoursFaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ngx-material-timepicker-face", 0);
      ɵɵlistener("timeChange", function NgxMaterialTimepicker12HoursFaceComponent_Template_ngx_material_timepicker_face_timeChange_0_listener($event) {
        return ctx.hourChange.next($event);
      })("timeSelected", function NgxMaterialTimepicker12HoursFaceComponent_Template_ngx_material_timepicker_face_timeSelected_0_listener($event) {
        return ctx.onTimeSelected($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("selectedTime", ctx.selectedHour)("faceTime", ctx.hoursList);
    }
  },
  dependencies: [NgxMaterialTimepickerFaceComponent],
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepicker12HoursFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-12-hours-face",
      templateUrl: "ngx-material-timepicker-12-hours-face.component.html",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [];
  }, {
    period: [{
      type: Input
    }]
  });
})();
var NgxMaterialTimepickerMinutesFaceComponent = class {
  constructor() {
    this.minutesList = [];
    this.timeUnit = TimeUnit;
    this.minuteChange = new EventEmitter();
  }
  ngOnChanges(changes) {
    if (changes["period"] && changes["period"].currentValue) {
      const minutes = TimepickerTimeUtils.getMinutes(this.minutesGap);
      this.minutesList = TimepickerTimeUtils.disableMinutes(minutes, this.selectedHour, {
        min: this.minTime,
        max: this.maxTime,
        format: this.format,
        period: this.period
      });
    }
  }
};
NgxMaterialTimepickerMinutesFaceComponent.ɵfac = function NgxMaterialTimepickerMinutesFaceComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerMinutesFaceComponent)();
};
NgxMaterialTimepickerMinutesFaceComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerMinutesFaceComponent,
  selectors: [["ngx-material-timepicker-minutes-face"]],
  inputs: {
    selectedMinute: "selectedMinute",
    selectedHour: "selectedHour",
    period: "period",
    minTime: "minTime",
    maxTime: "maxTime",
    format: "format",
    minutesGap: "minutesGap"
  },
  outputs: {
    minuteChange: "minuteChange"
  },
  standalone: false,
  features: [ɵɵNgOnChangesFeature],
  decls: 1,
  vars: 4,
  consts: [[3, "timeChange", "faceTime", "selectedTime", "minutesGap", "unit"]],
  template: function NgxMaterialTimepickerMinutesFaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ngx-material-timepicker-face", 0);
      ɵɵlistener("timeChange", function NgxMaterialTimepickerMinutesFaceComponent_Template_ngx_material_timepicker_face_timeChange_0_listener($event) {
        return ctx.minuteChange.next($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("faceTime", ctx.minutesList)("selectedTime", ctx.selectedMinute)("minutesGap", ctx.minutesGap)("unit", ctx.timeUnit.MINUTE);
    }
  },
  dependencies: [NgxMaterialTimepickerFaceComponent],
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerMinutesFaceComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-minutes-face",
      templateUrl: "./ngx-material-timepicker-minutes-face.component.html"
    }]
  }], null, {
    selectedMinute: [{
      type: Input
    }],
    selectedHour: [{
      type: Input
    }],
    period: [{
      type: Input
    }],
    minTime: [{
      type: Input
    }],
    maxTime: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    minuteChange: [{
      type: Output
    }]
  });
})();
var NgxMaterialTimepickerButtonComponent = class {
};
NgxMaterialTimepickerButtonComponent.ɵfac = function NgxMaterialTimepickerButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerButtonComponent)();
};
NgxMaterialTimepickerButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerButtonComponent,
  selectors: [["ngx-material-timepicker-button"]],
  standalone: false,
  ngContentSelectors: _c0,
  decls: 3,
  vars: 0,
  consts: [["type", "button", 1, "timepicker-button"]],
  template: function NgxMaterialTimepickerButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "button", 0)(1, "span");
      ɵɵprojection(2);
      ɵɵelementEnd()();
    }
  },
  styles: ['.timepicker-button[_ngcontent-%COMP%]{display:inline-block;height:36px;min-width:88px;line-height:36px;border:12px;border-radius:2px;background-color:transparent;text-align:center;transition:all .45s cubic-bezier(.23,1,.32,1);overflow:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none;position:relative;cursor:pointer;outline:none;color:#00bfff}@supports (color: var(--button-color)){.timepicker-button[_ngcontent-%COMP%]{color:var(--button-color)}}.timepicker-button[_ngcontent-%COMP%]:hover, .timepicker-button[_ngcontent-%COMP%]:focus{background-color:#9993}.timepicker-button[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:14px;text-transform:uppercase;font-weight:600;padding-left:16px;padding-right:16px;font-family:"Roboto",sans-serif}@supports (font-family: var(--primary-font-family)){.timepicker-button[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-family:var(--primary-font-family)}}']
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerButtonComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-button",
      templateUrl: "./ngx-material-timepicker-button.component.html",
      styleUrls: ["./ngx-material-timepicker-button.component.scss"]
    }]
  }], null, null);
})();
var OverlayDirective = class {
  constructor(eventService) {
    this.eventService = eventService;
  }
  onClick(e) {
    if (!this.preventClick) {
      this.eventService.dispatchEvent(e);
    }
    e.preventDefault();
  }
};
OverlayDirective.ɵfac = function OverlayDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || OverlayDirective)(ɵɵdirectiveInject(NgxMaterialTimepickerEventService));
};
OverlayDirective.ɵdir = ɵɵdefineDirective({
  type: OverlayDirective,
  selectors: [["", "overlay", ""]],
  hostBindings: function OverlayDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function OverlayDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
  },
  inputs: {
    preventClick: [0, "overlay", "preventClick"]
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OverlayDirective, [{
    type: Directive,
    args: [{
      selector: "[overlay]"
    }]
  }], function() {
    return [{
      type: NgxMaterialTimepickerEventService
    }];
  }, {
    preventClick: [{
      type: Input,
      args: ["overlay"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var NgxMaterialTimepickerThemeDirective = class {
  constructor(elementRef) {
    this.element = elementRef.nativeElement;
  }
  ngAfterViewInit() {
    if (this.theme) {
      this.setTheme(this.theme);
    }
  }
  setTheme(theme) {
    for (const val in theme) {
      if (theme.hasOwnProperty(val)) {
        if (typeof theme[val] === "string") {
          for (const prop in theme) {
            if (theme.hasOwnProperty(prop)) {
              this.element.style.setProperty(`--${camelCaseToDash(prop)}`, theme[prop]);
            }
          }
          return;
        }
        this.setTheme(theme[val]);
      }
    }
  }
};
NgxMaterialTimepickerThemeDirective.ɵfac = function NgxMaterialTimepickerThemeDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerThemeDirective)(ɵɵdirectiveInject(ElementRef));
};
NgxMaterialTimepickerThemeDirective.ɵdir = ɵɵdefineDirective({
  type: NgxMaterialTimepickerThemeDirective,
  selectors: [["", "ngxMaterialTimepickerTheme", ""]],
  inputs: {
    theme: [0, "ngxMaterialTimepickerTheme", "theme"]
  },
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerThemeDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMaterialTimepickerTheme]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    theme: [{
      type: Input,
      args: ["ngxMaterialTimepickerTheme"]
    }]
  });
})();
function camelCaseToDash(myStr) {
  return myStr.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
var AnimationState;
(function(AnimationState2) {
  AnimationState2["ENTER"] = "enter";
  AnimationState2["LEAVE"] = "leave";
})(AnimationState || (AnimationState = {}));
var NgxMaterialTimepickerContainerComponent = class {
  constructor(timepickerService, eventService, locale) {
    this.timepickerService = timepickerService;
    this.eventService = eventService;
    this.locale = locale;
    this.timeUnit = TimeUnit;
    this.activeTimeUnit = TimeUnit.HOUR;
    this.unsubscribe = new Subject();
  }
  set defaultTime(time) {
    this._defaultTime = time;
    this.setDefaultTime(time);
  }
  get defaultTime() {
    return this._defaultTime;
  }
  onKeydown(e) {
    this.eventService.dispatchEvent(e);
    e.stopPropagation();
  }
  ngOnInit() {
    this.animationState = !this.disableAnimation && AnimationState.ENTER;
    this.defineTime();
    this.selectedHour = this.timepickerService.selectedHour.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.selectedMinute = this.timepickerService.selectedMinute.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.selectedPeriod = this.timepickerService.selectedPeriod.pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
    this.timepickerBaseRef.timeUpdated.pipe(takeUntil(this.unsubscribe)).subscribe(this.setDefaultTime.bind(this));
  }
  onHourChange(hour) {
    this.timepickerService.hour = hour;
    this.onTimeChange();
  }
  onHourSelected(hour) {
    if (!this.hoursOnly) {
      this.changeTimeUnit(TimeUnit.MINUTE);
    }
    this.timepickerBaseRef.hourSelected.next(hour);
  }
  onMinuteChange(minute) {
    this.timepickerService.minute = minute;
    this.onTimeChange();
  }
  changePeriod(period) {
    this.timepickerService.period = period;
    this.onTimeChange();
  }
  changeTimeUnit(unit) {
    this.activeTimeUnit = unit;
  }
  setTime() {
    this.timepickerBaseRef.timeSet.next(this.timepickerService.getFullTime(this.format));
    this.close();
  }
  close() {
    if (this.disableAnimation) {
      this.timepickerBaseRef.close();
      return;
    }
    this.animationState = AnimationState.LEAVE;
  }
  animationDone(event) {
    if (event.phaseName === "done" && event.toState === AnimationState.LEAVE) {
      this.timepickerBaseRef.close();
    }
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  setDefaultTime(time) {
    this.timepickerService.setDefaultTimeIfAvailable(time, this.minTime, this.maxTime, this.format, this.minutesGap);
  }
  defineTime() {
    const minTime = this.minTime;
    if (minTime && !this.time && !this.defaultTime) {
      const time = TimeAdapter.fromDateTimeToString(minTime, this.format);
      this.setDefaultTime(time);
    }
  }
  onTimeChange() {
    const time = TimeAdapter.toLocaleTimeString(this.timepickerService.getFullTime(this.format), {
      locale: this.locale,
      format: this.format
    });
    this.timepickerBaseRef.timeChanged.emit(time);
  }
};
NgxMaterialTimepickerContainerComponent.ɵfac = function NgxMaterialTimepickerContainerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerContainerComponent)(ɵɵdirectiveInject(NgxMaterialTimepickerService), ɵɵdirectiveInject(NgxMaterialTimepickerEventService), ɵɵdirectiveInject(TIME_LOCALE));
};
NgxMaterialTimepickerContainerComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerContainerComponent,
  selectors: [["ngx-material-timepicker-container"]],
  hostBindings: function NgxMaterialTimepickerContainerComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown", function NgxMaterialTimepickerContainerComponent_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
  },
  inputs: {
    defaultTime: "defaultTime"
  },
  standalone: false,
  features: [ɵɵProvidersFeature([NgxMaterialTimepickerService])],
  decls: 22,
  vars: 31,
  consts: [["cancelBtnDefault", ""], ["confirmBtnDefault", ""], ["ampmHours", ""], [1, "timepicker-backdrop-overlay", 3, "overlay", "ngClass"], [1, "timepicker-overlay"], [3, "appendToInput", "inputElement", "ngxMaterialTimepickerTheme"], [1, "timepicker", 3, "ngClass"], [1, "timepicker__header"], [3, "periodChanged", "timeUnitChanged", "hourChanged", "minuteChanged", "format", "hour", "minute", "period", "activeTimeUnit", "minTime", "maxTime", "isEditable", "editableHintTmpl", "minutesGap", "hoursOnly"], [1, "timepicker__main-content"], [1, "timepicker__body", 3, "ngSwitch"], [4, "ngSwitchCase"], [3, "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap", "minuteChange", 4, "ngSwitchCase"], [1, "timepicker__actions"], [3, "click"], [4, "ngTemplateOutlet"], [3, "selectedHour", "minTime", "maxTime", "format", "hourChange", "hourSelected", 4, "ngIf", "ngIfElse"], [3, "hourChange", "hourSelected", "selectedHour", "minTime", "maxTime", "format"], [3, "hourChange", "hourSelected", "selectedHour", "period", "minTime", "maxTime"], [3, "minuteChange", "selectedMinute", "selectedHour", "minTime", "maxTime", "format", "period", "minutesGap"]],
  template: function NgxMaterialTimepickerContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelement(0, "div", 3);
      ɵɵelementStart(1, "div", 4)(2, "ngx-material-timepicker-content", 5)(3, "div", 6);
      ɵɵlistener("@timepicker.done", function NgxMaterialTimepickerContainerComponent_Template_div_animation_timepicker_done_3_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.animationDone($event));
      });
      ɵɵelementStart(4, "header", 7)(5, "ngx-material-timepicker-dial", 8);
      ɵɵpipe(6, "async");
      ɵɵpipe(7, "async");
      ɵɵpipe(8, "async");
      ɵɵlistener("periodChanged", function NgxMaterialTimepickerContainerComponent_Template_ngx_material_timepicker_dial_periodChanged_5_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changePeriod($event));
      })("timeUnitChanged", function NgxMaterialTimepickerContainerComponent_Template_ngx_material_timepicker_dial_timeUnitChanged_5_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changeTimeUnit($event));
      })("hourChanged", function NgxMaterialTimepickerContainerComponent_Template_ngx_material_timepicker_dial_hourChanged_5_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onHourChange($event));
      })("minuteChanged", function NgxMaterialTimepickerContainerComponent_Template_ngx_material_timepicker_dial_minuteChanged_5_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onMinuteChange($event));
      });
      ɵɵelementEnd()();
      ɵɵelementStart(9, "div", 9)(10, "div", 10);
      ɵɵtemplate(11, NgxMaterialTimepickerContainerComponent_div_11_Template, 4, 2, "div", 11)(12, NgxMaterialTimepickerContainerComponent_ngx_material_timepicker_minutes_face_12_Template, 4, 13, "ngx-material-timepicker-minutes-face", 12);
      ɵɵelementEnd();
      ɵɵelementStart(13, "div", 13)(14, "div", 14);
      ɵɵlistener("click", function NgxMaterialTimepickerContainerComponent_Template_div_click_14_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.close());
      });
      ɵɵtemplate(15, NgxMaterialTimepickerContainerComponent_ng_container_15_Template, 1, 0, "ng-container", 15);
      ɵɵelementEnd();
      ɵɵelementStart(16, "div", 14);
      ɵɵlistener("click", function NgxMaterialTimepickerContainerComponent_Template_div_click_16_listener() {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.setTime());
      });
      ɵɵtemplate(17, NgxMaterialTimepickerContainerComponent_ng_container_17_Template, 1, 0, "ng-container", 15);
      ɵɵelementEnd()()()()()();
      ɵɵtemplate(18, NgxMaterialTimepickerContainerComponent_ng_template_18_Template, 2, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor)(20, NgxMaterialTimepickerContainerComponent_ng_template_20_Template, 2, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      let tmp_10_0;
      let tmp_11_0;
      const cancelBtnDefault_r7 = ɵɵreference(19);
      const confirmBtnDefault_r8 = ɵɵreference(21);
      ɵɵproperty("overlay", ctx.preventOverlayClick)("ngClass", ɵɵpureFunction1(29, _c10, ctx.appendToInput));
      ɵɵadvance(2);
      ɵɵproperty("appendToInput", ctx.appendToInput)("inputElement", ctx.inputElement)("ngxMaterialTimepickerTheme", ctx.theme);
      ɵɵadvance();
      ɵɵproperty("@timepicker", ctx.animationState)("ngClass", ctx.timepickerClass);
      ɵɵadvance(2);
      ɵɵproperty("format", ctx.format)("hour", (tmp_10_0 = ɵɵpipeBind1(6, 23, ctx.selectedHour)) == null ? null : tmp_10_0.time)("minute", (tmp_11_0 = ɵɵpipeBind1(7, 25, ctx.selectedMinute)) == null ? null : tmp_11_0.time)("period", ɵɵpipeBind1(8, 27, ctx.selectedPeriod))("activeTimeUnit", ctx.activeTimeUnit)("minTime", ctx.minTime)("maxTime", ctx.maxTime)("isEditable", ctx.enableKeyboardInput)("editableHintTmpl", ctx.editableHintTmpl)("minutesGap", ctx.minutesGap)("hoursOnly", ctx.hoursOnly);
      ɵɵadvance(5);
      ɵɵproperty("ngSwitch", ctx.activeTimeUnit);
      ɵɵadvance();
      ɵɵproperty("ngSwitchCase", ctx.timeUnit.HOUR);
      ɵɵadvance();
      ɵɵproperty("ngSwitchCase", ctx.timeUnit.MINUTE);
      ɵɵadvance(3);
      ɵɵproperty("ngTemplateOutlet", ctx.cancelBtnTmpl ? ctx.cancelBtnTmpl : cancelBtnDefault_r7);
      ɵɵadvance(2);
      ɵɵproperty("ngTemplateOutlet", ctx.confirmBtnTmpl ? ctx.confirmBtnTmpl : confirmBtnDefault_r8);
    }
  },
  dependencies: [NgxMaterialTimepickerContentComponent, NgxMaterialTimepickerDialComponent, NgxMaterialTimepicker24HoursFaceComponent, NgxMaterialTimepicker12HoursFaceComponent, NgxMaterialTimepickerMinutesFaceComponent, NgxMaterialTimepickerButtonComponent, OverlayDirective, NgClass, NgxMaterialTimepickerThemeDirective, NgSwitch, NgSwitchCase, NgIf, NgTemplateOutlet, AsyncPipe],
  styles: ['[_nghost-%COMP%]{--body-background-color: #fff;--primary-font-family: "Roboto", sans-serif;--button-color: deepskyblue;--dial-active-color: #fff;--dial-inactive-color: rgba(255, 255, 255, .5);--dial-background-color: deepskyblue;--dial-editable-active-color: deepskyblue;--dial-editable-background-color: #fff;--clock-face-time-active-color: #fff;--clock-face-time-inactive-color: #6c6c6c;--clock-face-inner-time-inactive-color: #929292;--clock-face-time-disabled-color: #c5c5c5;--clock-face-background-color: #f0f0f0;--clock-hand-color: deepskyblue}.timepicker-backdrop-overlay[_ngcontent-%COMP%]{position:fixed;top:0;bottom:0;right:0;left:0;background-color:#0000004d;z-index:999;pointer-events:auto}.timepicker-backdrop-overlay--transparent[_ngcontent-%COMP%]{background-color:transparent}.timepicker-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999;pointer-events:none}.timepicker[_ngcontent-%COMP%]{width:300px;border-radius:2px;box-shadow:#00000040 0 14px 45px,#00000038 0 10px 18px;outline:none;position:static;z-index:999;pointer-events:auto}.timepicker__header[_ngcontent-%COMP%]{padding:15px 30px;background-color:#00bfff}@supports (background-color: var(--dial-background-color)){.timepicker__header[_ngcontent-%COMP%]{background-color:var(--dial-background-color)}}.timepicker__body[_ngcontent-%COMP%]{padding:15px 5px;display:flex;justify-content:center;align-items:center;background-color:#fff}@supports (background-color: var(--body-background-color)){.timepicker__body[_ngcontent-%COMP%]{background-color:var(--body-background-color)}}.timepicker__actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;padding:15px;background-color:#fff}@supports (background-color: var(--body-background-color)){.timepicker__actions[_ngcontent-%COMP%]{background-color:var(--body-background-color)}}@media (max-device-width: 1023px) and (orientation: landscape){.timepicker[_ngcontent-%COMP%]{display:flex;width:515px}.timepicker__header[_ngcontent-%COMP%]{display:flex;align-items:center}.timepicker__main-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%}.timepicker__actions[_ngcontent-%COMP%]{padding:5px;margin-top:-1px}}'],
  data: {
    animation: [trigger("timepicker", [transition(`* => ${AnimationState.ENTER}`, [style({
      transform: "translateY(-30%)"
    }), animate("0.2s ease-out", style({
      transform: "translateY(0)"
    }))]), transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [style({
      transform: "translateY(0)",
      opacity: 1
    }), animate("0.2s ease-out", style({
      transform: "translateY(-30%)",
      opacity: 0
    }))])])]
  }
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerContainerComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-container",
      templateUrl: "./ngx-material-timepicker-container.component.html",
      styleUrls: ["./ngx-material-timepicker-container.component.scss"],
      animations: [trigger("timepicker", [transition(`* => ${AnimationState.ENTER}`, [style({
        transform: "translateY(-30%)"
      }), animate("0.2s ease-out", style({
        transform: "translateY(0)"
      }))]), transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [style({
        transform: "translateY(0)",
        opacity: 1
      }), animate("0.2s ease-out", style({
        transform: "translateY(-30%)",
        opacity: 0
      }))])])],
      providers: [NgxMaterialTimepickerService]
    }]
  }], function() {
    return [{
      type: NgxMaterialTimepickerService
    }, {
      type: NgxMaterialTimepickerEventService
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TIME_LOCALE]
      }]
    }];
  }, {
    defaultTime: [{
      type: Input
    }],
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var DomService = class {
  constructor(cfr, appRef, injector, document) {
    this.cfr = cfr;
    this.appRef = appRef;
    this.injector = injector;
    this.document = document;
  }
  appendTimepickerToBody(timepicker, config) {
    this.componentRef = this.cfr.resolveComponentFactory(timepicker).create(this.injector);
    Object.keys(config).forEach((key) => this.componentRef.instance[key] = config[key]);
    this.appRef.attachView(this.componentRef.hostView);
    const domElement = this.componentRef.hostView.rootNodes[0];
    this.document.body.appendChild(domElement);
  }
  destroyTimepicker() {
    this.componentRef.destroy();
    this.appRef.detachView(this.componentRef.hostView);
  }
};
DomService.ɵfac = function DomService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || DomService)(ɵɵinject(ComponentFactoryResolver$1), ɵɵinject(ApplicationRef), ɵɵinject(Injector), ɵɵinject(DOCUMENT, 8));
};
DomService.ɵprov = ɵɵdefineInjectable({
  token: DomService,
  factory: DomService.ɵfac,
  providedIn: "root"
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DomService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: ComponentFactoryResolver$1
    }, {
      type: ApplicationRef
    }, {
      type: Injector
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var ESCAPE = 27;
var NgxMaterialTimepickerComponent = class {
  constructor(eventService, domService) {
    this.eventService = eventService;
    this.domService = domService;
    this.timeUpdated = new Subject();
    this.isEsc = true;
    this.hoursOnly = false;
    this.timeSet = new EventEmitter();
    this.opened = new EventEmitter();
    this.closed = new EventEmitter();
    this.hourSelected = new EventEmitter();
    this.timeChanged = new EventEmitter();
    this.unsubscribe = new Subject();
  }
  /**
   * @deprecated Since version 5.1.1. Will be deleted on version 6.0.0. Use @Input() theme instead
   */
  set ngxMaterialTimepickerTheme(theme) {
    console.warn(`'ngxMaterialTimepickerTheme' is deprecated. Use 'theme' instead`);
    this._ngxMaterialTimepickerTheme = theme;
  }
  set format(value) {
    this._format = value === 24 ? 24 : 12;
  }
  get format() {
    return this.timepickerInput ? this.timepickerInput.format : this._format;
  }
  set minutesGap(gap) {
    if (gap == null) {
      return;
    }
    gap = Math.floor(gap);
    this._minutesGap = gap <= 59 ? gap : 1;
  }
  get minutesGap() {
    return this._minutesGap;
  }
  get minTime() {
    return this.timepickerInput ? this.timepickerInput.min : this.min;
  }
  get maxTime() {
    return this.timepickerInput ? this.timepickerInput.max : this.max;
  }
  get disabled() {
    return this.timepickerInput && this.timepickerInput.disabled;
  }
  get time() {
    return this.timepickerInput && this.timepickerInput.value;
  }
  get inputElement() {
    return this.timepickerInput && this.timepickerInput.element;
  }
  /***
   * Register an input with this timepicker.
   * input - The timepicker input to register with this timepicker
   */
  registerInput(input) {
    if (this.timepickerInput) {
      throw Error("A Timepicker can only be associated with a single input.");
    }
    this.timepickerInput = input;
  }
  open() {
    this.domService.appendTimepickerToBody(NgxMaterialTimepickerContainerComponent, {
      timepickerBaseRef: this,
      time: this.time,
      defaultTime: this.defaultTime,
      maxTime: this.maxTime,
      minTime: this.minTime,
      format: this.format,
      minutesGap: this.minutesGap,
      disableAnimation: this.disableAnimation,
      cancelBtnTmpl: this.cancelBtnTmpl,
      confirmBtnTmpl: this.confirmBtnTmpl,
      editableHintTmpl: this.editableHintTmpl,
      disabled: this.disabled,
      enableKeyboardInput: this.enableKeyboardInput,
      preventOverlayClick: this.preventOverlayClick,
      appendToInput: this.appendToInput,
      hoursOnly: this.hoursOnly,
      theme: this.theme || this._ngxMaterialTimepickerTheme,
      timepickerClass: this.timepickerClass,
      inputElement: this.inputElement
    });
    this.opened.next();
    this.subscribeToEvents();
  }
  close() {
    this.domService.destroyTimepicker();
    this.closed.next();
    this.unsubscribeFromEvents();
  }
  updateTime(time) {
    this.timeUpdated.next(time);
  }
  subscribeToEvents() {
    merge(this.eventService.backdropClick, this.eventService.keydownEvent.pipe(filter((e) => e.keyCode === ESCAPE && this.isEsc))).pipe(takeUntil(this.unsubscribe)).subscribe(() => this.close());
  }
  unsubscribeFromEvents() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
};
NgxMaterialTimepickerComponent.ɵfac = function NgxMaterialTimepickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerComponent)(ɵɵdirectiveInject(NgxMaterialTimepickerEventService), ɵɵdirectiveInject(DomService));
};
NgxMaterialTimepickerComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerComponent,
  selectors: [["ngx-material-timepicker"]],
  inputs: {
    cancelBtnTmpl: "cancelBtnTmpl",
    editableHintTmpl: "editableHintTmpl",
    confirmBtnTmpl: "confirmBtnTmpl",
    isEsc: [0, "ESC", "isEsc"],
    enableKeyboardInput: "enableKeyboardInput",
    preventOverlayClick: "preventOverlayClick",
    disableAnimation: "disableAnimation",
    appendToInput: "appendToInput",
    hoursOnly: "hoursOnly",
    defaultTime: "defaultTime",
    timepickerClass: "timepickerClass",
    theme: "theme",
    min: "min",
    max: "max",
    ngxMaterialTimepickerTheme: "ngxMaterialTimepickerTheme",
    format: "format",
    minutesGap: "minutesGap"
  },
  outputs: {
    timeSet: "timeSet",
    opened: "opened",
    closed: "closed",
    hourSelected: "hourSelected",
    timeChanged: "timeChanged"
  },
  standalone: false,
  decls: 0,
  vars: 0,
  template: function NgxMaterialTimepickerComponent_Template(rf, ctx) {
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker",
      template: ""
    }]
  }], function() {
    return [{
      type: NgxMaterialTimepickerEventService
    }, {
      type: DomService
    }];
  }, {
    cancelBtnTmpl: [{
      type: Input
    }],
    editableHintTmpl: [{
      type: Input
    }],
    confirmBtnTmpl: [{
      type: Input
    }],
    isEsc: [{
      type: Input,
      args: ["ESC"]
    }],
    enableKeyboardInput: [{
      type: Input
    }],
    preventOverlayClick: [{
      type: Input
    }],
    disableAnimation: [{
      type: Input
    }],
    appendToInput: [{
      type: Input
    }],
    hoursOnly: [{
      type: Input
    }],
    defaultTime: [{
      type: Input
    }],
    timepickerClass: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    ngxMaterialTimepickerTheme: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    timeSet: [{
      type: Output
    }],
    opened: [{
      type: Output
    }],
    closed: [{
      type: Output
    }],
    hourSelected: [{
      type: Output
    }],
    timeChanged: [{
      type: Output
    }]
  });
})();
var NgxMaterialTimepickerToggleIconDirective = class {
};
NgxMaterialTimepickerToggleIconDirective.ɵfac = function NgxMaterialTimepickerToggleIconDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerToggleIconDirective)();
};
NgxMaterialTimepickerToggleIconDirective.ɵdir = ɵɵdefineDirective({
  type: NgxMaterialTimepickerToggleIconDirective,
  selectors: [["", "ngxMaterialTimepickerToggleIcon", ""]],
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerToggleIconDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxMaterialTimepickerToggleIcon]"
    }]
  }], null, null);
})();
var NgxMaterialTimepickerToggleComponent = class {
  get disabled() {
    return this._disabled === void 0 ? this.timepicker.disabled : this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  open(event) {
    if (this.timepicker) {
      this.timepicker.open();
      event.stopPropagation();
    }
  }
};
NgxMaterialTimepickerToggleComponent.ɵfac = function NgxMaterialTimepickerToggleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerToggleComponent)();
};
NgxMaterialTimepickerToggleComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxMaterialTimepickerToggleComponent,
  selectors: [["ngx-material-timepicker-toggle"]],
  contentQueries: function NgxMaterialTimepickerToggleComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, NgxMaterialTimepickerToggleIconDirective, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customIcon = _t.first);
    }
  },
  inputs: {
    timepicker: [0, "for", "timepicker"],
    disabled: "disabled"
  },
  standalone: false,
  ngContentSelectors: _c12,
  decls: 3,
  vars: 2,
  consts: [["type", "button", 1, "ngx-material-timepicker-toggle", 3, "click", "disabled"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "width", "24px", "height", "24px", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "width", "24px", "height", "24px"], ["d", "M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"]],
  template: function NgxMaterialTimepickerToggleComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c11);
      ɵɵelementStart(0, "button", 0);
      ɵɵlistener("click", function NgxMaterialTimepickerToggleComponent_Template_button_click_0_listener($event) {
        return ctx.open($event);
      });
      ɵɵtemplate(1, NgxMaterialTimepickerToggleComponent__svg_svg_1_Template, 2, 0, "svg", 1);
      ɵɵprojection(2);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("disabled", ctx.disabled);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.customIcon);
    }
  },
  dependencies: [NgIf],
  styles: [".ngx-material-timepicker-toggle[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;padding:4px;background-color:transparent;border-radius:50%;text-align:center;border:none;outline:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;transition:background-color .3s;cursor:pointer}.ngx-material-timepicker-toggle[_ngcontent-%COMP%]:focus{background-color:#00000012}"]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerToggleComponent, [{
    type: Component,
    args: [{
      selector: "ngx-material-timepicker-toggle",
      templateUrl: "ngx-material-timepicker-toggle.component.html",
      styleUrls: ["ngx-material-timepicker-toggle.component.scss"]
    }]
  }], null, {
    timepicker: [{
      type: Input,
      args: ["for"]
    }],
    disabled: [{
      type: Input
    }],
    customIcon: [{
      type: ContentChild,
      args: [NgxMaterialTimepickerToggleIconDirective, {
        static: true
      }]
    }]
  });
})();
var TimepickerDirective = class {
  constructor(elementRef, locale) {
    this.elementRef = elementRef;
    this.locale = locale;
    this._format = 12;
    this._value = "";
    this.timepickerSubscriptions = [];
    this.onTouched = () => {
    };
    this.onChange = () => {
    };
  }
  set format(value) {
    this._format = value === 24 ? 24 : 12;
    const isDynamicallyChanged = value && this.previousFormat && this.previousFormat !== this._format;
    if (isDynamicallyChanged) {
      this.value = this._value;
      this._timepicker.updateTime(this._value);
    }
    this.previousFormat = this._format;
  }
  get format() {
    return this._format;
  }
  set min(value) {
    console.log(value);
    if (typeof value === "string") {
      this._min = TimeAdapter.parseTime(value, {
        locale: this.locale,
        format: this.format
      });
      return;
    }
    this._min = value;
  }
  get min() {
    return this._min;
  }
  set max(value) {
    if (typeof value === "string") {
      this._max = TimeAdapter.parseTime(value, {
        locale: this.locale,
        format: this.format
      });
      return;
    }
    this._max = value;
  }
  get max() {
    return this._max;
  }
  set timepicker(picker) {
    this.registerTimepicker(picker);
  }
  set value(value) {
    if (!value) {
      this._value = "";
      this.updateInputValue();
      return;
    }
    this.setTimeIfAvailable(value);
  }
  get value() {
    if (!this._value) {
      return "";
    }
    return TimeAdapter.toLocaleTimeString(this._value, {
      format: this.format,
      locale: this.locale
    });
  }
  get element() {
    return this.elementRef && this.elementRef.nativeElement;
  }
  set defaultTime(time) {
    this._timepicker.defaultTime = TimeAdapter.formatTime(time, {
      locale: this.locale,
      format: this.format
    });
  }
  updateValue(value) {
    this.value = value;
    this.onChange(value);
  }
  ngOnChanges(changes) {
    var _a;
    const value = (_a = changes === null || changes === void 0 ? void 0 : changes.value) === null || _a === void 0 ? void 0 : _a.currentValue;
    if (value) {
      this.setTimeIfAvailable(value);
      this.defaultTime = value;
    }
  }
  onClick(event) {
    if (!this.disableClick) {
      this._timepicker.open();
      event.stopPropagation();
    }
  }
  writeValue(value) {
    this.value = value;
    if (value) {
      this.defaultTime = value;
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  ngOnDestroy() {
    this.timepickerSubscriptions.forEach((s2) => s2.unsubscribe());
  }
  registerTimepicker(picker) {
    if (picker) {
      this._timepicker = picker;
      this._timepicker.registerInput(this);
      this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe((time) => {
        this.value = time;
        this.onChange(this.value);
        this.onTouched();
        this.defaultTime = this._value;
      }));
    } else {
      throw new Error("NgxMaterialTimepickerComponent is not defined. Please make sure you passed the timepicker to ngxTimepicker directive");
    }
  }
  updateInputValue() {
    this.elementRef.nativeElement.value = this.value;
  }
  setTimeIfAvailable(value) {
    var _a;
    const time = TimeAdapter.formatTime(value, {
      locale: this.locale,
      format: this.format
    });
    const isAvailable = TimeAdapter.isTimeAvailable(time, this._min, this._max, "minutes", (_a = this._timepicker) === null || _a === void 0 ? void 0 : _a.minutesGap, this._format);
    if (isAvailable) {
      this._value = time;
      this.updateInputValue();
    } else {
      this.value = null;
      console.warn("Selected time doesn't match min or max value");
    }
  }
};
TimepickerDirective.ɵfac = function TimepickerDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TimepickerDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(TIME_LOCALE));
};
TimepickerDirective.ɵdir = ɵɵdefineDirective({
  type: TimepickerDirective,
  selectors: [["", "ngxTimepicker", ""]],
  hostVars: 1,
  hostBindings: function TimepickerDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("change", function TimepickerDirective_change_HostBindingHandler($event) {
        return ctx.updateValue($event.target.value);
      })("blur", function TimepickerDirective_blur_HostBindingHandler() {
        return ctx.onTouched();
      })("click", function TimepickerDirective_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("disabled", ctx.disabled);
    }
  },
  inputs: {
    format: "format",
    min: "min",
    max: "max",
    timepicker: [0, "ngxTimepicker", "timepicker"],
    value: "value",
    disabled: "disabled",
    disableClick: "disableClick"
  },
  standalone: false,
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TimepickerDirective,
    multi: true
  }]), ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimepickerDirective, [{
    type: Directive,
    args: [{
      selector: "[ngxTimepicker]",
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: TimepickerDirective,
        multi: true
      }],
      host: {
        "[disabled]": "disabled",
        "(change)": "updateValue($event.target.value)",
        "(blur)": "onTouched()"
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TIME_LOCALE]
      }]
    }];
  }, {
    format: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    timepicker: [{
      type: Input,
      args: ["ngxTimepicker"]
    }],
    value: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    disableClick: [{
      type: Input
    }],
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
var TimeFormatterPipe = class {
  transform(time, timeUnit) {
    if (time == null || time === "") {
      return time;
    }
    switch (timeUnit) {
      case TimeUnit.HOUR:
        return DateTime.fromObject({
          hour: +time
        }).toFormat("HH");
      case TimeUnit.MINUTE:
        return DateTime.fromObject({
          minute: +time
        }).toFormat("mm");
      default:
        throw new Error("no such time unit");
    }
  }
};
TimeFormatterPipe.ɵfac = function TimeFormatterPipe_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || TimeFormatterPipe)();
};
TimeFormatterPipe.ɵpipe = ɵɵdefinePipe({
  name: "timeFormatter",
  type: TimeFormatterPipe,
  pure: true,
  standalone: false
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimeFormatterPipe, [{
    type: Pipe,
    args: [{
      name: "timeFormatter"
    }]
  }], null, null);
})();
var NgxTimepickerTimeControlComponent = class {
  constructor(timeParser) {
    this.timeParser = timeParser;
    this.timeChanged = new EventEmitter();
  }
  ngOnChanges(changes) {
    if (changes.timeList && this.time != null) {
      if (this.isSelectedTimeDisabled(this.time)) {
        this.setAvailableTime();
      }
    }
  }
  changeTime(event) {
    event.stopPropagation();
    const char = String.fromCharCode(event.keyCode);
    const time = concatTime(String(this.time), char);
    this.changeTimeIfValid(time);
  }
  onKeydown(event) {
    event.stopPropagation();
    if (!isDigit(event)) {
      event.preventDefault();
    }
    switch (event.key) {
      case "ArrowUp":
        this.increase();
        break;
      case "ArrowDown":
        this.decrease();
        break;
    }
    if (this.preventTyping && event.key !== "Tab") {
      event.preventDefault();
    }
  }
  increase() {
    if (!this.disabled) {
      let nextTime = +this.time + (this.minutesGap || 1);
      if (nextTime > this.max) {
        nextTime = this.min;
      }
      if (this.isSelectedTimeDisabled(nextTime)) {
        nextTime = this.getAvailableTime(nextTime, this.getNextAvailableTime.bind(this));
      }
      if (nextTime !== this.time) {
        this.timeChanged.emit(nextTime);
      }
    }
  }
  decrease() {
    if (!this.disabled) {
      let previousTime = +this.time - (this.minutesGap || 1);
      if (previousTime < this.min) {
        previousTime = this.minutesGap ? this.max - (this.minutesGap - 1) : this.max;
      }
      if (this.isSelectedTimeDisabled(previousTime)) {
        previousTime = this.getAvailableTime(previousTime, this.getPrevAvailableTime.bind(this));
      }
      if (previousTime !== this.time) {
        this.timeChanged.emit(previousTime);
      }
    }
  }
  onFocus() {
    this.isFocused = true;
    this.previousTime = this.time;
  }
  onBlur() {
    this.isFocused = false;
    if (this.previousTime !== this.time) {
      this.changeTimeIfValid(+this.time);
    }
  }
  onModelChange(value) {
    this.time = +this.timeParser.transform(value, this.timeUnit);
  }
  changeTimeIfValid(value) {
    if (!isNaN(value)) {
      this.time = value;
      if (this.time > this.max) {
        const timeString = String(value);
        this.time = +timeString[timeString.length - 1];
      }
      if (this.time < this.min) {
        this.time = this.min;
      }
      this.timeChanged.emit(this.time);
    }
  }
  isSelectedTimeDisabled(time) {
    return this.timeList.find((faceTime) => faceTime.time === time).disabled;
  }
  getNextAvailableTime(index) {
    const timeCollection = this.timeList;
    const maxValue = timeCollection.length;
    for (let i = index + 1; i < maxValue; i++) {
      const time = timeCollection[i];
      if (!time.disabled) {
        return time.time;
      }
    }
  }
  getPrevAvailableTime(index) {
    for (let i = index; i >= 0; i--) {
      const time = this.timeList[i];
      if (!time.disabled) {
        return time.time;
      }
    }
  }
  getAvailableTime(currentTime, fn) {
    const currentTimeIndex = this.timeList.findIndex((time) => time.time === currentTime);
    const availableTime = fn(currentTimeIndex);
    return availableTime != null ? availableTime : this.time;
  }
  setAvailableTime() {
    const availableTime = this.timeList.find((t) => !t.disabled);
    if (availableTime != null) {
      this.time = availableTime.time;
      this.timeChanged.emit(this.time);
    }
  }
};
NgxTimepickerTimeControlComponent.ɵfac = function NgxTimepickerTimeControlComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxTimepickerTimeControlComponent)(ɵɵdirectiveInject(TimeParserPipe));
};
NgxTimepickerTimeControlComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxTimepickerTimeControlComponent,
  selectors: [["ngx-timepicker-time-control"]],
  inputs: {
    time: "time",
    min: "min",
    max: "max",
    placeholder: "placeholder",
    timeUnit: "timeUnit",
    disabled: "disabled",
    timeList: "timeList",
    preventTyping: "preventTyping",
    minutesGap: "minutesGap"
  },
  outputs: {
    timeChanged: "timeChanged"
  },
  standalone: false,
  features: [ɵɵProvidersFeature([TimeParserPipe]), ɵɵNgOnChangesFeature],
  decls: 9,
  vars: 13,
  consts: [[1, "ngx-timepicker-control", 3, "ngClass"], ["maxlength", "2", 1, "ngx-timepicker-control__input", 3, "ngModelChange", "keydown", "keypress", "focus", "blur", "ngModel", "placeholder", "disabled"], [1, "ngx-timepicker-control__arrows"], ["role", "button", 1, "ngx-timepicker-control__arrow", 3, "click"]],
  template: function NgxTimepickerTimeControlComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "input", 1);
      ɵɵpipe(2, "timeParser");
      ɵɵpipe(3, "timeLocalizer");
      ɵɵlistener("ngModelChange", function NgxTimepickerTimeControlComponent_Template_input_ngModelChange_1_listener($event) {
        return ctx.onModelChange($event);
      })("keydown", function NgxTimepickerTimeControlComponent_Template_input_keydown_1_listener($event) {
        return ctx.onKeydown($event);
      })("keypress", function NgxTimepickerTimeControlComponent_Template_input_keypress_1_listener($event) {
        return ctx.changeTime($event);
      })("focus", function NgxTimepickerTimeControlComponent_Template_input_focus_1_listener() {
        return ctx.onFocus();
      })("blur", function NgxTimepickerTimeControlComponent_Template_input_blur_1_listener() {
        return ctx.onBlur();
      });
      ɵɵelementEnd();
      ɵɵelementStart(4, "div", 2)(5, "span", 3);
      ɵɵlistener("click", function NgxTimepickerTimeControlComponent_Template_span_click_5_listener() {
        return ctx.increase();
      });
      ɵɵtext(6, " ▲ ");
      ɵɵelementEnd();
      ɵɵelementStart(7, "span", 3);
      ɵɵlistener("click", function NgxTimepickerTimeControlComponent_Template_span_click_7_listener() {
        return ctx.decrease();
      });
      ɵɵtext(8, " ▼ ");
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵproperty("ngClass", ɵɵpureFunction1(11, _c13, ctx.isFocused));
      ɵɵadvance();
      ɵɵproperty("ngModel", ɵɵpipeBind3(3, 7, ɵɵpipeBind2(2, 4, ctx.time, ctx.timeUnit), ctx.timeUnit, true))("placeholder", ctx.placeholder)("disabled", ctx.disabled);
    }
  },
  dependencies: [NgClass, DefaultValueAccessor, MaxLengthValidator, NgControlStatus, NgModel, TimeLocalizerPipe, TimeParserPipe],
  styles: ['.ngx-timepicker-control[_ngcontent-%COMP%]{position:relative;display:flex;width:60px;height:30px;padding:0 5px;box-sizing:border-box}.ngx-timepicker-control--active[_ngcontent-%COMP%]:after{content:"";position:absolute;bottom:-2px;left:0;width:100%;height:1px;background-color:#00bfff}.ngx-timepicker-control__input[_ngcontent-%COMP%]{width:100%;height:100%;padding:0 5px 0 0;border:0;font-size:1rem;color:inherit;outline:none;text-align:center}.ngx-timepicker-control__input[_ngcontent-%COMP%]:disabled{background-color:transparent}.ngx-timepicker-control__arrows[_ngcontent-%COMP%]{position:absolute;right:2px;top:0;display:flex;flex-direction:column}.ngx-timepicker-control__arrow[_ngcontent-%COMP%]{font-size:11px;color:#0006;cursor:pointer;transition:color .2s;-webkit-user-select:none;-moz-user-select:none;user-select:none}.ngx-timepicker-control__arrow[_ngcontent-%COMP%]:hover{color:#000000e6}'],
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTimepickerTimeControlComponent, [{
    type: Component,
    args: [{
      selector: "ngx-timepicker-time-control",
      templateUrl: "./ngx-timepicker-time-control.component.html",
      styleUrls: ["./ngx-timepicker-time-control.component.scss"],
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [TimeParserPipe]
    }]
  }], function() {
    return [{
      type: TimeParserPipe
    }];
  }, {
    time: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    timeUnit: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    timeList: [{
      type: Input
    }],
    preventTyping: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }]
  });
})();
function concatTime(currentTime, nextTime) {
  const isNumber2 = /\d/.test(nextTime);
  if (isNumber2) {
    const time = currentTime + nextTime;
    return +time;
  }
}
var NgxTimepickerPeriodSelectorComponent = class {
  constructor(locale) {
    this.locale = locale;
    this.periodSelected = new EventEmitter();
    this.period = TimePeriod;
    this.meridiems = Info.meridiems({
      locale: this.locale
    });
  }
  set selectedPeriod(period) {
    if (period) {
      const periods = [TimePeriod.AM, TimePeriod.PM];
      this.localizedPeriod = this.meridiems[periods.indexOf(period)];
    }
  }
  open() {
    if (!this.disabled) {
      this.isOpened = true;
    }
  }
  select(period) {
    this.periodSelected.next(period);
    this.isOpened = false;
  }
  backdropClick() {
    this.isOpened = false;
  }
};
NgxTimepickerPeriodSelectorComponent.ɵfac = function NgxTimepickerPeriodSelectorComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxTimepickerPeriodSelectorComponent)(ɵɵdirectiveInject(TIME_LOCALE));
};
NgxTimepickerPeriodSelectorComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxTimepickerPeriodSelectorComponent,
  selectors: [["ngx-timepicker-period-selector"]],
  inputs: {
    isOpened: "isOpened",
    disabled: "disabled",
    selectedPeriod: "selectedPeriod"
  },
  outputs: {
    periodSelected: "periodSelected"
  },
  standalone: false,
  decls: 9,
  vars: 6,
  consts: [[1, "period"], [1, "period-control"], ["type", "button", 1, "period-control__button", "period__btn--default", 3, "click", "ngClass"], [1, "period-control__arrow"], ["class", "period-selector", 3, "timepickerAutofocus", 4, "ngIf"], ["class", "overlay", 3, "click", 4, "ngIf"], [1, "period-selector", 3, "timepickerAutofocus"], ["type", "button", 1, "period-selector__button", "period__btn--default", 3, "click", "ngClass"], [1, "overlay", 3, "click"]],
  template: function NgxTimepickerPeriodSelectorComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "button", 2);
      ɵɵlistener("click", function NgxTimepickerPeriodSelectorComponent_Template_button_click_2_listener() {
        return ctx.open();
      });
      ɵɵelementStart(3, "span");
      ɵɵtext(4);
      ɵɵelementEnd();
      ɵɵelementStart(5, "span", 3);
      ɵɵtext(6, "▼");
      ɵɵelementEnd()()();
      ɵɵtemplate(7, NgxTimepickerPeriodSelectorComponent_ul_7_Template, 7, 10, "ul", 4);
      ɵɵelementEnd();
      ɵɵtemplate(8, NgxTimepickerPeriodSelectorComponent_div_8_Template, 1, 0, "div", 5);
    }
    if (rf & 2) {
      ɵɵadvance(2);
      ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c14, ctx.disabled));
      ɵɵadvance(2);
      ɵɵtextInterpolate(ctx.localizedPeriod);
      ɵɵadvance(3);
      ɵɵproperty("ngIf", ctx.isOpened);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.isOpened);
    }
  },
  dependencies: [NgClass, NgIf, AutofocusDirective],
  styles: ['.period[_ngcontent-%COMP%]{position:relative}.period__btn--default[_ngcontent-%COMP%]{padding:0;border:none;background-color:transparent;cursor:pointer;text-align:left;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;outline:none}.period-control[_ngcontent-%COMP%]{position:relative}.period-control__button[_ngcontent-%COMP%]{position:relative;width:60px;font-size:1rem;color:inherit;text-align:center}.period-control__button[_ngcontent-%COMP%]:not(.period-control__button--disabled):focus:after{content:"";position:absolute;bottom:-8px;left:0;width:100%;height:1px;background-color:#00bfff}.period-control__arrow[_ngcontent-%COMP%]{margin-left:10px;font-size:12px;color:#0006}.period-selector[_ngcontent-%COMP%]{position:absolute;top:calc(50% - 50px);right:calc(-50% + -50px);max-width:135px;width:150px;padding:6px 0;margin:0;list-style:none;background-color:#f5f5f5;box-shadow:0 1px 3px #0003,0 1px 1px #00000024,0 2px 1px -1px #0000001f;z-index:201}.period-selector__button[_ngcontent-%COMP%]{width:100%;height:48px;padding:0 16px;line-height:48px}.period-selector__button--active[_ngcontent-%COMP%]{color:#00bfff}.period-selector__button[_ngcontent-%COMP%]:focus{background-color:#eee}.overlay[_ngcontent-%COMP%]{position:fixed;width:100%;height:100%;top:0;left:0;background-color:transparent;z-index:200}'],
  data: {
    animation: [trigger("scaleInOut", [transition(":enter", [style({
      transform: "scale(0)",
      opacity: 0
    }), animate(200, style({
      transform: "scale(1)",
      opacity: 1
    }))]), transition(":leave", [animate(200, style({
      transform: "scale(0)",
      opacity: 0
    }))])])]
  },
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTimepickerPeriodSelectorComponent, [{
    type: Component,
    args: [{
      selector: "ngx-timepicker-period-selector",
      templateUrl: "ngx-timepicker-period-selector.component.html",
      styleUrls: ["./ngx-timepicker-period-selector.component.scss"],
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [trigger("scaleInOut", [transition(":enter", [style({
        transform: "scale(0)",
        opacity: 0
      }), animate(200, style({
        transform: "scale(1)",
        opacity: 1
      }))]), transition(":leave", [animate(200, style({
        transform: "scale(0)",
        opacity: 0
      }))])])]
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TIME_LOCALE]
      }]
    }];
  }, {
    isOpened: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    selectedPeriod: [{
      type: Input
    }],
    periodSelected: [{
      type: Output
    }]
  });
})();
var NgxTimepickerFieldComponent = class {
  constructor(timepickerService, locale) {
    this.timepickerService = timepickerService;
    this.locale = locale;
    this.minHour = 1;
    this.maxHour = 12;
    this.timeUnit = TimeUnit;
    this.buttonAlign = "right";
    this.timeChanged = new EventEmitter();
    this._format = 12;
    this.unsubscribe$ = new Subject();
    this.isFirstTimeChange = true;
    this.onChange = () => {
    };
  }
  set format(value) {
    this._format = value === 24 ? 24 : 12;
    this.minHour = this._format === 12 ? 1 : 0;
    this.maxHour = this._format === 12 ? 12 : 23;
    this.hoursList = TimepickerTimeUtils.getHours(this._format);
    const isDynamicallyChanged = value && this.previousFormat && this.previousFormat !== this._format;
    if (isDynamicallyChanged) {
      this.updateTime(this.timepickerTime);
    }
    this.previousFormat = this._format;
  }
  get format() {
    return this._format;
  }
  set min(value) {
    if (typeof value === "string") {
      this._min = TimeAdapter.parseTime(value, {
        locale: this.locale,
        format: this.format
      });
      return;
    }
    this._min = value;
  }
  get min() {
    return this._min;
  }
  set max(value) {
    if (typeof value === "string") {
      this._max = TimeAdapter.parseTime(value, {
        locale: this.locale,
        format: this.format
      });
      return;
    }
    this._max = value;
  }
  get max() {
    return this._max;
  }
  set defaultTime(val) {
    this._defaultTime = val;
    this.isDefaultTime = !!val;
  }
  get defaultTime() {
    return this._defaultTime;
  }
  set minutesGap(gap) {
    if (gap == null) {
      return;
    }
    gap = Math.floor(gap);
    this._minutesGap = gap <= 59 ? gap : 1;
  }
  get minutesGap() {
    return this._minutesGap;
  }
  ngOnInit() {
    this.initTime(this.defaultTime);
    this.hoursList = TimepickerTimeUtils.getHours(this._format);
    this.minutesList = TimepickerTimeUtils.getMinutes();
    this.isTimeRangeSet = !!(this.min || this.max);
    this.hour$ = this.timepickerService.selectedHour.pipe(tap((clockTime) => this.selectedHour = clockTime.time), map(this.changeDefaultTimeValue.bind(this)), tap(() => this.isTimeRangeSet && this.updateAvailableMinutes()));
    this.minute$ = this.timepickerService.selectedMinute.pipe(map(this.changeDefaultTimeValue.bind(this)), tap(() => this.isFirstTimeChange = false));
    if (this.format === 12) {
      this.timepickerService.selectedPeriod.pipe(distinctUntilChanged(), tap((period) => this.period = period), tap((period) => this.isChangePeriodDisabled = this.isPeriodDisabled(period)), takeUntil(this.unsubscribe$)).subscribe(() => this.isTimeRangeSet && this.updateAvailableTime());
    } else if (this.isTimeRangeSet) {
      this.updateAvailableTime();
    }
  }
  writeValue(val) {
    if (val) {
      this.initTime(val);
    } else {
      this.resetTime();
    }
  }
  registerOnTouched(fn) {
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  changeHour(hour) {
    this.timepickerService.hour = this.hoursList.find((h) => h.time === hour);
    this.changeTime();
  }
  changeMinute(minute) {
    this.timepickerService.minute = this.minutesList.find((m) => m.time === minute);
    this.changeTime();
  }
  changePeriod(period) {
    this.timepickerService.period = period;
    this.changeTime();
  }
  onTimeSet(time) {
    this.updateTime(time);
    this.emitLocalTimeChange(time);
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  changeTime() {
    const time = this.timepickerService.getFullTime(this.format);
    this.timepickerTime = time;
    this.emitLocalTimeChange(time);
  }
  resetTime() {
    this.timepickerService.hour = {
      angle: 0,
      time: null
    };
    this.timepickerService.minute = {
      angle: 0,
      time: null
    };
  }
  emitLocalTimeChange(time) {
    const localTime = TimeAdapter.toLocaleTimeString(time, {
      format: this.format,
      locale: this.locale
    });
    this.onChange(localTime);
    this.timeChanged.emit(localTime);
  }
  changeDefaultTimeValue(clockFaceTime) {
    if (!this.isDefaultTime && this.isFirstTimeChange) {
      return Object.assign(Object.assign({}, clockFaceTime), {
        time: null
      });
    }
    return clockFaceTime;
  }
  updateAvailableHours() {
    this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
      min: this.min,
      max: this.max,
      format: this.format,
      period: this.period
    });
  }
  updateAvailableMinutes() {
    this.minutesList = TimepickerTimeUtils.disableMinutes(this.minutesList, this.selectedHour, {
      min: this.min,
      max: this.max,
      format: this.format,
      period: this.period
    });
  }
  updateAvailableTime() {
    this.updateAvailableHours();
    if (this.selectedHour) {
      this.updateAvailableMinutes();
    }
  }
  updateTime(time) {
    if (time) {
      const formattedTime = TimeAdapter.formatTime(time, {
        locale: this.locale,
        format: this.format
      });
      this.timepickerService.setDefaultTimeIfAvailable(formattedTime, this.min, this.max, this.format);
      this.timepickerTime = formattedTime;
    }
  }
  initTime(time) {
    const isDefaultTimeAvailable = TimeAdapter.isTimeAvailable(time, this.min, this.max, "minutes", null, this.format);
    if (!isDefaultTimeAvailable) {
      if (this.min) {
        this.updateTime(TimeAdapter.fromDateTimeToString(this.min, this.format));
        return;
      }
      if (this.max) {
        this.updateTime(TimeAdapter.fromDateTimeToString(this.max, this.format));
        return;
      }
    }
    this.updateTime(time);
  }
  isPeriodDisabled(period) {
    return TimepickerTimeUtils.disableHours(TimepickerTimeUtils.getHours(12), {
      min: this.min,
      max: this.max,
      format: 12,
      period: period === TimePeriod.AM ? TimePeriod.PM : TimePeriod.AM
    }).every((time) => time.disabled);
  }
};
NgxTimepickerFieldComponent.ɵfac = function NgxTimepickerFieldComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxTimepickerFieldComponent)(ɵɵdirectiveInject(NgxMaterialTimepickerService), ɵɵdirectiveInject(TIME_LOCALE));
};
NgxTimepickerFieldComponent.ɵcmp = ɵɵdefineComponent({
  type: NgxTimepickerFieldComponent,
  selectors: [["ngx-timepicker-field"]],
  inputs: {
    disabled: "disabled",
    toggleIcon: "toggleIcon",
    buttonAlign: "buttonAlign",
    clockTheme: "clockTheme",
    controlOnly: "controlOnly",
    cancelBtnTmpl: "cancelBtnTmpl",
    confirmBtnTmpl: "confirmBtnTmpl",
    format: "format",
    min: "min",
    max: "max",
    defaultTime: "defaultTime",
    minutesGap: "minutesGap"
  },
  outputs: {
    timeChanged: "timeChanged"
  },
  standalone: false,
  features: [ɵɵProvidersFeature([NgxMaterialTimepickerService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: NgxTimepickerFieldComponent,
    multi: true
  }])],
  decls: 13,
  vars: 34,
  consts: [["timepicker", ""], ["defaultIcon", ""], [1, "ngx-timepicker", 3, "ngClass"], [1, "ngx-timepicker__control--first", 3, "timeChanged", "placeholder", "time", "min", "max", "timeUnit", "disabled", "timeList", "preventTyping"], [1, "ngx-timepicker__time-colon", "ngx-timepicker__control--second"], [1, "ngx-timepicker__control--third", 3, "timeChanged", "placeholder", "time", "min", "max", "timeUnit", "disabled", "timeList", "preventTyping", "minutesGap"], ["class", "ngx-timepicker__control--forth", 3, "selectedPeriod", "disabled", "periodSelected", 4, "ngIf"], ["class", "ngx-timepicker__toggle", 3, "ngClass", "for", "disabled", 4, "ngIf"], [3, "timeSet", "min", "max", "theme", "defaultTime", "format", "cancelBtnTmpl", "confirmBtnTmpl", "minutesGap"], [1, "ngx-timepicker__control--forth", 3, "periodSelected", "selectedPeriod", "disabled"], [1, "ngx-timepicker__toggle", 3, "ngClass", "for", "disabled"], ["ngxMaterialTimepickerToggleIcon", ""], [4, "ngTemplateOutlet"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "width", "24px", "height", "24px"], ["d", "M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"]],
  template: function NgxTimepickerFieldComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 2)(1, "ngx-timepicker-time-control", 3);
      ɵɵpipe(2, "async");
      ɵɵlistener("timeChanged", function NgxTimepickerFieldComponent_Template_ngx_timepicker_time_control_timeChanged_1_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changeHour($event));
      });
      ɵɵelementEnd();
      ɵɵelementStart(3, "span", 4);
      ɵɵtext(4, ":");
      ɵɵelementEnd();
      ɵɵelementStart(5, "ngx-timepicker-time-control", 5);
      ɵɵpipe(6, "async");
      ɵɵlistener("timeChanged", function NgxTimepickerFieldComponent_Template_ngx_timepicker_time_control_timeChanged_5_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.changeMinute($event));
      });
      ɵɵelementEnd();
      ɵɵtemplate(7, NgxTimepickerFieldComponent_ngx_timepicker_period_selector_7_Template, 1, 2, "ngx-timepicker-period-selector", 6)(8, NgxTimepickerFieldComponent_ngx_material_timepicker_toggle_8_Template, 3, 6, "ngx-material-timepicker-toggle", 7);
      ɵɵelementEnd();
      ɵɵelementStart(9, "ngx-material-timepicker", 8, 0);
      ɵɵlistener("timeSet", function NgxTimepickerFieldComponent_Template_ngx_material_timepicker_timeSet_9_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.onTimeSet($event));
      });
      ɵɵelementEnd();
      ɵɵtemplate(11, NgxTimepickerFieldComponent_ng_template_11_Template, 2, 0, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_12_0;
      ɵɵproperty("ngClass", ɵɵpureFunction1(32, _c16, ctx.disabled));
      ɵɵadvance();
      ɵɵproperty("placeholder", "HH")("time", (tmp_4_0 = ɵɵpipeBind1(2, 28, ctx.hour$)) == null ? null : tmp_4_0.time)("min", ctx.minHour)("max", ctx.maxHour)("timeUnit", ctx.timeUnit.HOUR)("disabled", ctx.disabled)("timeList", ctx.hoursList)("preventTyping", ctx.isTimeRangeSet);
      ɵɵadvance(4);
      ɵɵproperty("placeholder", "MM")("time", (tmp_12_0 = ɵɵpipeBind1(6, 30, ctx.minute$)) == null ? null : tmp_12_0.time)("min", 0)("max", 59)("timeUnit", ctx.timeUnit.MINUTE)("disabled", ctx.disabled)("timeList", ctx.minutesList)("preventTyping", ctx.isTimeRangeSet)("minutesGap", ctx.minutesGap);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", ctx.format !== 24);
      ɵɵadvance();
      ɵɵproperty("ngIf", !ctx.controlOnly);
      ɵɵadvance();
      ɵɵproperty("min", ctx.min)("max", ctx.max)("theme", ctx.clockTheme)("defaultTime", ctx.timepickerTime)("format", ctx.format)("cancelBtnTmpl", ctx.cancelBtnTmpl)("confirmBtnTmpl", ctx.confirmBtnTmpl)("minutesGap", ctx.minutesGap);
    }
  },
  dependencies: [NgxTimepickerTimeControlComponent, NgxTimepickerPeriodSelectorComponent, NgxMaterialTimepickerToggleComponent, NgxMaterialTimepickerComponent, NgClass, NgIf, NgxMaterialTimepickerToggleIconDirective, NgTemplateOutlet, AsyncPipe],
  styles: [".ngx-timepicker[_ngcontent-%COMP%]{display:flex;align-items:center;height:100%;border-bottom:1px solid rgba(0,0,0,.12)}.ngx-timepicker--disabled[_ngcontent-%COMP%]{background:rgba(0,0,0,.07);pointer-events:none}.ngx-timepicker__time-colon[_ngcontent-%COMP%]{margin-left:10px}.ngx-timepicker__control--first[_ngcontent-%COMP%]{order:1}.ngx-timepicker__control--second[_ngcontent-%COMP%]{order:2}.ngx-timepicker__control--third[_ngcontent-%COMP%]{order:3}.ngx-timepicker__control--forth[_ngcontent-%COMP%]{order:4}.ngx-timepicker__toggle[_ngcontent-%COMP%]{order:4}.ngx-timepicker__toggle--left[_ngcontent-%COMP%]{order:0}"],
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxTimepickerFieldComponent, [{
    type: Component,
    args: [{
      selector: "ngx-timepicker-field",
      templateUrl: "./ngx-timepicker-field.component.html",
      styleUrls: ["./ngx-timepicker-field.component.scss"],
      providers: [NgxMaterialTimepickerService, {
        provide: NG_VALUE_ACCESSOR,
        useExisting: NgxTimepickerFieldComponent,
        multi: true
      }],
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [{
      type: NgxMaterialTimepickerService
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [TIME_LOCALE]
      }]
    }];
  }, {
    disabled: [{
      type: Input
    }],
    toggleIcon: [{
      type: Input
    }],
    buttonAlign: [{
      type: Input
    }],
    clockTheme: [{
      type: Input
    }],
    controlOnly: [{
      type: Input
    }],
    cancelBtnTmpl: [{
      type: Input
    }],
    confirmBtnTmpl: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    defaultTime: [{
      type: Input
    }],
    minutesGap: [{
      type: Input
    }],
    timeChanged: [{
      type: Output
    }]
  });
})();
var NgxMaterialTimepickerModule = class _NgxMaterialTimepickerModule {
  // tslint:disable-next-line:max-line-length
  static setOpts(locale, numberingSystem = TimeAdapter.DEFAULT_NUMBERING_SYSTEM) {
    return {
      ngModule: _NgxMaterialTimepickerModule,
      providers: [{
        provide: TIME_LOCALE,
        useValue: locale
      }, {
        provide: NUMBERING_SYSTEM,
        useValue: numberingSystem
      }]
    };
  }
};
NgxMaterialTimepickerModule.ɵfac = function NgxMaterialTimepickerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || NgxMaterialTimepickerModule)();
};
NgxMaterialTimepickerModule.ɵmod = ɵɵdefineNgModule({
  type: NgxMaterialTimepickerModule,
  declarations: [NgxMaterialTimepickerComponent, NgxMaterialTimepicker24HoursFaceComponent, NgxMaterialTimepicker12HoursFaceComponent, NgxMaterialTimepickerMinutesFaceComponent, NgxMaterialTimepickerFaceComponent, NgxMaterialTimepickerToggleComponent, NgxMaterialTimepickerButtonComponent, NgxMaterialTimepickerDialComponent, NgxMaterialTimepickerDialControlComponent, NgxMaterialTimepickerPeriodComponent, TimeFormatterPipe, TimepickerDirective, OverlayDirective, NgxMaterialTimepickerToggleIconDirective, AutofocusDirective, MinutesFormatterPipe, NgxMaterialTimepickerThemeDirective, NgxTimepickerFieldComponent, NgxTimepickerTimeControlComponent, NgxTimepickerPeriodSelectorComponent, TimeLocalizerPipe, TimeParserPipe, ActiveHourPipe, ActiveMinutePipe, NgxMaterialTimepickerContainerComponent, NgxMaterialTimepickerContentComponent, AppendToInputDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [NgxMaterialTimepickerComponent, NgxMaterialTimepickerToggleComponent, NgxTimepickerFieldComponent, TimepickerDirective, NgxMaterialTimepickerToggleIconDirective, NgxMaterialTimepickerThemeDirective]
});
NgxMaterialTimepickerModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule, FormsModule, ReactiveFormsModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxMaterialTimepickerModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      exports: [NgxMaterialTimepickerComponent, NgxMaterialTimepickerToggleComponent, NgxTimepickerFieldComponent, TimepickerDirective, NgxMaterialTimepickerToggleIconDirective, NgxMaterialTimepickerThemeDirective],
      declarations: [NgxMaterialTimepickerComponent, NgxMaterialTimepicker24HoursFaceComponent, NgxMaterialTimepicker12HoursFaceComponent, NgxMaterialTimepickerMinutesFaceComponent, NgxMaterialTimepickerFaceComponent, NgxMaterialTimepickerToggleComponent, NgxMaterialTimepickerButtonComponent, NgxMaterialTimepickerDialComponent, NgxMaterialTimepickerDialControlComponent, NgxMaterialTimepickerPeriodComponent, TimeFormatterPipe, TimepickerDirective, OverlayDirective, NgxMaterialTimepickerToggleIconDirective, AutofocusDirective, MinutesFormatterPipe, NgxMaterialTimepickerThemeDirective, NgxTimepickerFieldComponent, NgxTimepickerTimeControlComponent, NgxTimepickerPeriodSelectorComponent, TimeLocalizerPipe, TimeParserPipe, ActiveHourPipe, ActiveMinutePipe, NgxMaterialTimepickerContainerComponent, NgxMaterialTimepickerContentComponent, AppendToInputDirective]
    }]
  }], null, null);
})();
export {
  NUMBERING_SYSTEM,
  NgxMaterialTimepickerComponent,
  NgxMaterialTimepickerModule,
  NgxMaterialTimepickerThemeDirective,
  NgxMaterialTimepickerToggleComponent,
  NgxMaterialTimepickerToggleIconDirective,
  NgxTimepickerFieldComponent,
  TIME_LOCALE,
  TimepickerDirective
};
/*! Bundled license information:

@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v20.1.2
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=ngx-material-timepicker.js.map
