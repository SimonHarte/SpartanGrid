# Spartan

The next generation LessCSS grid system. Try the [dynamic online grid demo](http://spartan-grid.herokuapp.com/).

> Requires [LessCSS](https://github.com/less/less.js) version 1.4.0 or above.

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
	- [Viewport Dependent Grids](#viewport-dependent-grids)
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
- custom css prefix
- short classes and corresponding less mixins
- tiny: **~10KB** of LessCSS which generates less than **2KB** of minified css

## Comparison

> Install [Chromoji](https://chrome.google.com/webstore/detail/chromoji-emoji-for-google/cahedbegdkagmcjfolhdlechbkeaieki?hl=en-GB) if you're using Chrome to see the icons.

|                           | Spartan | Twitter Bootstrap | Foundation | 960grid |
|---------------------------|:-------:|:-----------------:|:----------:|:-------:|
| less                      | ✅ | ✅ | ❌ | ❌ |
| sass                      | ❌ | ❌ | ✅ | ❌ |
| fluid                     | ✅ | ✅ | ✅ | ✅ |
| static                    | ✅ | ✅ | ✅ | ✅ |
| responsive                | ✅ | ✅ | ✅ | ❌ |
| block gutter              | ✅ | ✅ | ✅ | ❌ |
| column ordering           | ✅ | ✅ | ✅ | ✅ |
| offsets                   | ✅ | ✅ | ✅ | ✅ |
| viewport dependent grids  | ✅ | ❌ | ❌ | ❌ |
| custom prefix             | ✅ | ❌ | ❌ | ❌ |
| base css size (min)       | **1.8KB** | **11KB** | **9.5KB** | **2.7KB** |

## Getting Started

- Download Spartan
- Install [Node](http://nodejs.org/) and then LessCSS: `npm install -g less@1.6.3`
- Adjust the params in `grid-setup.less`
- Execute: `lessc compile.less grid.css`
- Use the generated classes in your markup or set up responsive layouts as needed

**Or**

- Integrate [`spartan.less`](https://github.com/SimonHarte/SpartanGrid/blob/master/spartan.less) in your project with
 a less build
- Call [`.grid-bundle()`](#grid-setup) with your configuration
- Use the generated classes in your markup or set up responsive layouts as needed

## Grid Structure

Here's a short example of how a Spartan grid looks like with a responsive layout implementation:

**HTML**

```html
<div class="g-row g-layout-1">
	<div class="g-col"></div>
	<div class="g-col"></div>
	<div class="g-col"></div>
	<div class="g-col"></div>
</div>
```

**LessCSS**

```less
.g-layout-1 {
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

Spartan uses a negative left margin on `.g-row` and left padding (gutter) on `.g-col`s for having a consistent structure and reduced output css.

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
.grid-bundle(@config: @grid-config);
```

#### Setup Params

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `prefix`       | expression | `~''` or custom | Example: `grid-` (without single quotes) |
| `grid-type`    | string  | `'fluid'` or `'fixed'` | Single quotes mandatory |
| `grid-width`   | pixel   | | |
| `gutter-width` | pixel   | | |
| `gutter-type`  | string  | `'fluid'` or `'fixed'` | Forced to `'fixed'` if `grid-type` is `'fixed'` |
| `grid-columns` | integer | | | |

#### Example Setup and Markup

**LessCSS**

```less
@grid-config: 'fluid', 960px, 20px, 'fixed', 12;

.grid-bundle(@config: @grid-config);
```

**HTML**

```html
<!-- defining two columns in the current grid (max columns: 12) -->
<div class="g-row">
	<div class="g-col g-span-6"></div>
	<div class="g-col g-span-6"></div>
</div>
```

- `.g-row` initializes a grid row and uses [H5BP clearfix](https://github
.com/h5bp/html5-boilerplate/blob/master/css/main.css#L161) to contain the floating `.g-col`s.
- `.g-col` applies default column styles like float and padding (gutter).
- `.g-span-[columns]` applies a column based width according ot the set maximum amount of columns.

### Grid Classes and Mixins

Spartan comes with an integrated LessCSS loop to generate grid classes according to your configuration. Instead of using the generated classes you can also use similar named mixins to apply the grid in a less style sheet.

```less
.grid-span([columns]), .g-span-[columns]
.grid-offset([columns]), .g-offset-[columns]
.grid-push([columns]), .g-push-[columns]
.grid-pull([columns]), .g-pull-[columns]
```

#### `grid-span`
Override the width of a column (default is full-width), equivalent to `.g-span-[columns]`.
Although you could just use the generated `.g-span-[columns]` classes, this mixin allows you to pass in floating 
point numbers, which enables you to define literally **any** width using the mixin.

```less
.grid-span(12/5);
```

#### `grid-offset`
Indent a column by the defined amount of grid columns, equivalent to `.g-offset-[columns]`.
While there are just positive indents in generated classes, you could also call this mixin with negative values.

> **Note:** Using negative indents generally only works in static width grids.

#### `grid-push` and `grid-pull`
Together with the additional class `.g-reorder` on `.g-row` you can reorder columns visually without changing the 
order in HTML. Note that you may run into problems if these are used within certain responsive layouts as they use 
relative positioning. Equivalent to `.g-push-[columns]` and `.g-pull-[columns]`, similar behavior as `.grid-offset()`.

### Responsive Layouts

There are three mixins which will help you create responsive layouts.

```less
.grid-col-set([col-name], [columns], [offset]);
.grid-col-set-equal([columns]);
.grid-col-clear([column-count]);
```

#### `grid-col-set`
Generate a class `.[col-name]` with `[columns]` width and `[offset]` indent as direct child of `.g-row`. Note that 
`[offset]` is an optional parameter and can be omitted if not used.

> We use direct child selectors so different responsive layouts cannot interfere with each other.

This mixin is used to define different columns inside a layout, so if one column takes 2/3 of the grid and the other 
1/3 you'd use the mixin twice like this:

	.g-layout-2 {
		// max columns: 12
		.grid-set(col-1, 8);
		.grid-set(col-2, 4);
	}

Which will enable you to use `.g-col-1` and `.g-col-2` as classes:

	<div class="g-row g-layout-2">
		<div class="g-col g-col-1"></div>
		<div class="g-col g-col-2"></div>
	</div>
	
#### `grid-col-set-equal`
Generate a `.g-col` selector as direct child of `.g-row` with the given width and also properly clear columns every 
nth child element using the `.grid-col-clear()` mixin.

#### `grid-col-clear`
Clear the float every nth+1 child so columns align properly if they differ in height. So if you have 3 columns per 
line, clear the 4th, the 7th, the 10th etc.

### Responsive Layout Example
With the following example you'd get a layout where you have **one column** if the viewport is **smaller than 40em**, 
**two columns** if it's **between 40em and 80em** and **three columns** if its **above 80em**.

```less
.g-layout-1 {
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

> **Note**: With a mobile first approach you either have to declare a media query or omit the definition because of the nth-child selector from `col-set-equal`.

Another working example of the above:

```less
.g-layout-1 {
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

> You can optimise the output css by wrapping all your layouts with media queries once to reduce duplication of media
 query definitions in the css, but this is probably harder to maintain.

## Advanced Usage

### Flexible Grid Setups

You would normally just use `.grid-bundle()` to set up a grid, but you can also use the following mixins to generate even more flexible grids in [less scopes](http://lesscss.org/features/#features-overview-feature-scope), see [Viewport Dependent Grids](#viewport-dependent-grids) and [Prefixing](#prefixing) for use cases.

#### `.grid-core([prefix])`

This will generate the core selectors and styles needed for any grid setup, e.g. clearing on the row, float of columns etc. No matter how much you customize your grid, this mixin has to be called only once in your project.

#### `.grid-unlock([config])`

Pass in your grid configuration like with `.grid-bundle()`. This will unlock all the grid mixins using the given 
configuration within the current scope and adjust the gutters.

```less
#my-scope {
	.grid-unlock(@scope-config);
	
	.custom-column {
		.grid-span(5);
	}
}
```

#### `.grid-generate()`

This mixin will generate all configuration sensitive classes like `.g-span-`, `.g-offset` etc. in the current scope.

### Viewport Dependent Grids

You can call `.grid-unlock()` and `.grid-generate()` **inside media queries** to generate different grid setups for 
different viewports like so:

```less
// generate base grid styles
.grid-core();

// grid setup for small screen
@media (max-width: 39.99em) {
	.grid-unlock('fluid', 960px, 5px, 'fixed', 12);
	.grid-generate();
}
// grid setup for medium screen
@media (min-width: 40em) and (max-width: 79.99em) {
	.grid-unlock('fluid', 960px, 15px, 'fixed', 12);
	.grid-generate();
}
// grid setup for large screen
@media (min-width: 80em) {
	.grid-unlock('fluid', 960px, 30px, 'fluid', 12);
	.grid-generate();
}
```

Note that you cannot make a mobile first, global configuration because the global mixins can not be reassigned inside
 the media queries.

> Of course `.grid-generate()` will generate all the grid styles in the given viewport, so with three viewports you'll have three times the normal css. That's why we invested a lot of effort into keeping the base css as tiny as possible ;).

You can always use `.grid-unlock()` in any separated media query to unlock grid mixins again.

```less
// unlock mixins in another media query again
@media (min-width: 40em) and (max-width: 79.99em) {
	.grid-unlock('fluid', 960px, 15px, 'fixed', 12);
	
	.g-col {
		.grid-span(6);
	}
}
```

> **Hint**: Save different grid setups in global variables to reuse anywhere.

### CSS Prefixing

`.grid-bundle()` (as well as `.grid-core()`) takes one optional parameter `prefix`, with which you can customize the generated classes.

 This prefix is per default set to `g-`, but you can simply just change it, so if you set `prefix` to for example 
 `grid-` the generated classes will look like this:

```less
.grid-row
.grid-col
.grid-span
.grid-offset
// etc...
```

> You can also omit the prefix by passing `~''` instead.

### Responsive Layout Container

You can either apply responsive layouts by adding the class to the `.g-row` directly or build a whole section with 
multiple `.g-row`s which use the layout by wrapping them with a container using the layout class.

```html
<div class="g-row g-layout-1">
	<div class="g-col"></div>
	<div class="g-col"></div>
	<div class="g-col"></div>
</div>
```

Or

```html
<div class="g-layout-1">
	<div class="g-row">
		<div class="g-col"></div>
		<div class="g-col"></div>
		<div class="g-col"></div>
	</div>
	<div class="g-row">
		<div class="g-col"></div>
		<div class="g-col"></div>
		<div class="g-col"></div>
	</div>
</div>
```

## Browser Support

**Not** supported:

- **IE7-**

**Partially** supported:

- **IE8**: basic grid working properly, no media query support and :nth-child clearing, 
**Note:** fully supported with [respond.js](https://github.com/scottjehl/Respond) and [selectivizr.js]
(http://selectivizr.com/) polyfills
- **Safari**: wrong measures with lots of small columns caused by safari always rounding down to integer when
calculating rendered pixels. Note that other grid systems suffer from this issue as well.

## Contributors

- Simon Harte (s.harte@gmx.ch)
- Marc Diethelm (marc@web5.me)
