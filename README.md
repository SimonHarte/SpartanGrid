# Spartan

The next generation LessCSS grid system. Try the [dynamic online grid demo](http://spartan-grid.herokuapp.com/).

> Requires [LessCSS](https://github.com/less/less.js) version 1.4.0 or above. Currently **does not** work with less version 1.7.0.

Spartan arose from a project where we had the need for a fluid responsive grid system with both html and less integration possibilities. As we couldn't find anything covering the requirements at that time we simply developed something on our own. Over time the initial idea developed into this vastly enhanced less grid system.

- [Features](#features)
- [Comparison with other Grids](#comparison)
- [Getting Started](#getting-started)
- [Grid Structure](#grid-structure)
- [Basic Usage](#basic-usage)
	- [Grid Setup](#grid-setup)
	- [Grid Classes and Mixins](#grid-classes-and-mixins)
	- [Responsive Layouts](#responsive-layouts)
- [Advanced Usage](#advanced-usage)
	- [Flexible Grid Setups](#flexible-grid-setups)
	- [Viewport Dependent Setups](#viewport-dependent-setups)
	- [CSS Prefixing](#css-prefixing)
	- [Responsive Layout Container](#responsive-layout-container)
- [Browser Support](#browser-support)

## Features

- supports all features of other common grid systems:
	- fluid or static grid
	- fully responsive
	- block gutter (fixed gutter in a fluid grid)
	- column reordering through css
	- column offsets
- grid creation API: **make viewport dependent grid setups**
- custom css prefix: multiple grid configurations possible
- short classes and corresponding less mixins
- tiny: **~11KB** of LessCSS which generates less than **2KB** of minified css

## Comparison

|                   | Spartan | Twitter Bootstrap | Foundation | 960grid |
|-------------------|:-------:|:-----------------:|:----------:|:-------:|
| less              | ✅ | ✅ | ❌ | ❌ |
| sass              | ❌ | ❌ | ✅ | ❌ |
| fluid             | ✅ | ✅ | ✅ | ✅ |
| static            | ✅ | ✅ | ✅ | ✅ |
| responsive        | ✅ | ✅ | ✅ | ❌ |
| block gutter      | ✅ | ✅ | ✅ | ❌ |
| column ordering   | ✅ | ✅ | ✅ | ✅ |
| offsets           | ✅ | ✅ | ✅ | ✅ |
| viewport dependent grid setups | ✅ | ❌ | ❌ | ❌ |
| custom prefix     | ✅ | ❌ | ❌ | ❌ |
| base css size (min)    | **1.7KB** | **11KB** | **9.5KB** | **2.7KB** |

## Getting Started

- Download Spartan
- Install [Node](http://nodejs.org/) and then LessCSS: `npm install -g less@1.6.3`
- Adjust the params in `grid-setup.less`
- Execute: `lessc compile.less grid.css`
- Use the given classes in your markup or set up responsive layouts as needed

## Grid Structure

Here's a short example of how a Spartan grid looks like with a responsive layout implementation:

**HTML**

```html
<div class="row layout-r-1">
	<div class="col"></div>
	<div class="col"></div>
	<div class="col"></div>
	<div class="col"></div>
</div>
```

**LessCSS**

```less
.layout-r-1 {
	// maximum columns: 12
	// omit small media definition as it uses full width anyway
	@media @medium {
		.grid-col-set-equal(6);
	}
	@media @large {
		.grid-col-set-equal(4);
	}
}
```

Spartan uses a negative left margin on `.row` and left padding (gutter) on `.col`s for having a consistent structure and reduced output css.

Check out [examples](https://github.com/SimonHarte/SpartanGrid/blob/master/examples/responsive-layouts.less) for more responsive layouts.

## Basic Usage

### Grid Setup

There are two ways to set up a grid with Spartan, within the basic usage we only explain the simpler one. If you need more flexibility, to set up viewport dependent grids etc. go to the [advanced usage](#flexible-setup-mixins) section.

The basic grid setup requires you to call just one mixin, pass in a configuration and an optional prefix (read more about [prefixing](#prefixing)).

```less
@grid-config: [grid-type], [grid-width], [gutter-width], [grid-type], [grid-columns];

.grid-bundle([prefix], @grid-config);
```

If you are not using a grid prefix, you have to name the config param, so `.grid-bundle()` correctly receives the configuration and doesn't think it's the prefix.

```less
.grid-bundle(@spartan-grid: @grid-config);
```

> Instead of using a config variable you could also just pass a comma separated list directly

#### Setup Params

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `prefix`       | expression | | Example: `grid-` (without single quotes) |
| `grid-type`    | string  | `'fluid'` or `'fixed'` | Single quotes mandatory |
| `grid-width`   | pixel   | | |
| `gutter-width` | pixel   | | |
| `gutter-type`  | string  | `'fluid'` or `'fixed'` | Forced to `'fixed'` if `grid-type` is `'fixed'` |
| `grid-columns` | integer | | | |

#### Example Setup and Markup

**LessCSS**

```less
@grid-config: 'fluid', 960px, 20px, 'fixed', 12;

.grid-bundle(@spartan-config: @grid-config);
```

**HTML**

```html
<!-- defining two columns in the current grid (max columns: 12) -->
<div class="row">
	<div class="col col-span-6"></div>
	<div class="col col-span-6"></div>
</div>
```

- `.row` initializes a grid row and uses [H5BP clearfix](https://github.com/h5bp/html5-boilerplate/blob/master/css/main.css#L161) to contain the floating `.col`s.
- `.col` applies default column styles like float and padding (gutter).
- `.col-span-[columns]` applies a column based width according ot the set maximum amount of columns.

### Grid Classes and Mixins

Instead of using the generated grid classes you can also use similar named mixins to apply the grid in a less style sheet.

```less
.grid-col-span([columns]), .col-span-[columns]
.grid-offset([columns]), .offset-[columns]
.grid-push([columns]), .push-[columns]
.grid-pull([columns]), .pull-[columns]
```

#### `grid-col-span`
Override the width of a column (default is full-width), equivalent to `.col-span-[columns]`.
Although you could just use the generated `.col-span-[columns]` classes, this mixin allows you to pass in any floating point number,
which enables you to set up a grid row with for example 5 columns with proper gutter size in a 12 column grid.

```less
.grid-col-span(12/5);
```

#### `grid-offset`
Indent a column by the defined amount of grid columns, equivalent to `.offset-[columns]`.
While there are just positive indents in generated classes, you could also call this mixin with negative values.

> **Note:** Negative indents only work properly in static width grids.

#### `grid-push` and `grid-pull`
Together with the additional class `.ordered` on `.row` you can reorder columns visually without changing the order in HTML.
Note that you may run into problems if these are used within certain responsive layouts as they use relative positioning.
Equivalent to `push-[columns]` and `pull-[columns]`, similar behavior as `.grid-offset()`.

### Responsive Layouts

There are three mixins which will help you create responsive layouts.

```less
.grid-col-set([col-name], [columns], [offset]);
.grid-col-set-equal([columns]);
.grid-col-clear([column-count]);
```

#### `grid-col-set`
Generate a class `.[col-name]` with `[columns]` width and `[offset]` indent as direct child of `.row` with the given width.

> We use direct child selectors so different responsive layouts cannot interfere with each other.

#### `grid-col-set-equal`
Generate a `.col` selector as direct child of `.row` with the given width and also properly clear columns every nth child element using the `.col-clear()` mixin.

#### `grid-col-clear`
Clear the float every nth+1 columns if columns differ in height, so if you have 3 columns per line, clear the 4th, the 7th, the 10th etc.

### Responsive Layout Example
With the following example you get a layout where you have one column if the viewport is smaller than 40em, 2 columns if it's between 40em and 80em and 3 columns if its above 80em.

```less
.layout-r-1 {
	// grid maximum columns = 12

	@media (max-width: 39.99em) {
		.grid-col-set-equal(12);
	}
	@media (min-width: 40em) and (max-width: 79.99em) {
		.grid-col-set-equal(6);
	}
	@media (min-width: 80em) {
		.grid-col-set-equal(4);
	}
}
```

> **Note**: With a mobile first approach you either have to declare a media query or omit the definition because of the nth-child selector in `col-set-equal`.

Another working example of the above:

```less
.layout-r-1 {
	// grid maximum columns = 12

	// omit small query definition if you'd set it to maximum grid width anyway

	@media (min-width: 40em) and (max-width: 79.99em) {
		.grid-col-set-equal(6);
	}
	@media (min-width: 80em) {
		.grid-col-set-equal(4);
	}
}
```

## Advanced Usage

### Flexible Grid Setups

You would normally just use `.grid-bundle()` to set up a grid, but you can also use the following mixins to generate even more flexible grids in [less scopes](http://lesscss.org/features/#features-overview-feature-scope), see [Viewport Dependent Setups](#viewport-dependent-setups) and [Prefixing](#prefixing) for use cases.

#### `.grid-core([prefix])`

This will generate the core selectors and styles needed for any grid setup, e.g. clearing on the row, float of columns etc. No matter how much you customize your grid, this mixin has to be called only once in your project.

#### `.grid-unlock([config])`

Pass in your grid configuration like with `.grid-bundle()`. This will unlock all the grid mixins using the given configuration within the current scope.

```less
#my-scope {
	.grid-unlock(@scope-config);
	.grid-gutter();
	
	.custom-column {
		.grid-col-span(5);
	}
}
```

> `config` can be either a comma separated list of configuration parameters or a variable containing the same.

#### `.grid-gutter([prefix])`

Used to set column gutters with the given configuration. While you don't need to `.grid-generate()` all classes anew when unlocking a certain grid configuration and using the grid mixins, you always need to adjust the gutters.

#### `.grid-generate([prefix])`

This mixin will generate all configuration sensitive classes like `.col-span-`, `.offset` etc. in the current scope.

### Viewport Dependent Setups

You can call `.grid-unlock()`, `.grid-gutter()` and `.grid-generate()` **inside media queries** to generate different grid setups for different viewports like so:

```less
// generate base grid styles
.grid-core();

// grid setup for small screen
@media (max-width: 39.99em) {
	.grid-unlock('fluid', 960px, 5px, 'fixed', 12);
	.grid-gutter();
	.grid-generate();
}
// grid setup for medium screen
@media (min-width: 40em) and (max-width: 79.99em) {
	.grid-unlock('fluid', 960px, 15px, 'fixed', 12);
	.grid-gutter();
	.grid-generate();
}
// grid setup for large screen
@media (min-width: 80em) {
	.grid-unlock('fluid', 960px, 30px, 'fluid', 12);
	.grid-gutter();
	.grid-generate();
}
```

Note that you cannot make a mobile first, global configuration because the global mixins seem to overwrite the ones inside the media queries.

> Of course `.grid-generate()` will generate all the grid styles in the given viewport, so with three viewports you'll have three times the normal css. That's why we invested a lot of effort into keeping the base css as tiny as possible ;).

You can always use `.grid-unlock()` with `.grid-gutter()` in any separated media query to unlock grid mixins again.

```less
// unlock mixins in another media query again
@media (min-width: 40em) and (max-width: 79.99em) {
	.grid-unlock('fluid', 960px, 15px, 'fixed', 12);
	.grid-gutter();
	
	.col {
		.grid-col-span(6);
	}
}
```

> **Hint**: Save different grid setups in global variables to reuse anywhere.

### CSS Prefixing

`.grid-bundle()` (as well as `.grid-core()`, `.grid-gutter()` and `.grid-generate()`) takes one optional parameter `prefix`, with which you can customize the generated classes.

 So if you set `prefix` to for example `grid-` the generated classes will look like this:

```less
.grid-row
.grid-col
.grid-col-span
// etc...
```

### Responsive Layout Container

You can either apply responsive layouts by adding the class to the `.row` directly or make a whole section with multiple `.row`s which use the layout by wrapping them with a container using the layout class.

```html
<div class="row layout-r-1>
	<div class="col"></div>
	<div class="col"></div>
	<div class="col"></div>
</div>
```

Or

```html
<div class="layout-r-1>
	<div class="row>
		<div class="col"></div>
		<div class="col"></div>
		<div class="col"></div>
	</div>
	<div class="row>
		<div class="col"></div>
		<div class="col"></div>
		<div class="col"></div>
	</div>
</div>
```

## Browser Support

**Not** supported:

- IE7-: wrong behavior with negative `.row` margin and no box-sizing

**Partially** supported:

- IE8: basic grid working, no media query support and :nth-child clearing, **Note:** fully supported with [respond.js](https://github.com/scottjehl/Respond) and [selectivizr.js](http://selectivizr.com/) polyfills
- Safari: wrong measures with lots of small columns caused by rounding to integer when converting percentage values to rendered pixels

## Contributors

- Simon Harte (s.harte@gmx.ch)
- Marc Diethelm (marc@web5.me)
