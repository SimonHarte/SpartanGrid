# Spartan Grid Documentation

- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
	- [Grid Creation API](#grid-creation-api)
	- [Viewport Dependent Configurations](#viewport-dependent-configurations)
	- [Custom Classes](#custom-classes)
- [Semantic Grid](#semantic-grid)
- [Responsive Approaches](#responsive-approaches)
	- [The "Spartan Way"](#the-spartan-way)
	- [The "Twitter Bootstrap Way"](#the-twitter-bootstrap-way)

## Basic Usage

All about basic usage of Spartan is documented in the [project readme](https://github.com/SimonHarte/SpartanGrid/blob/master/README.md#basic-usage).

## Advanced Usage

### Grid Creation API

You would normally just use `grid-bundle()` to set up a grid, but you can also use the following mixins
to generate even more flexible grids, see [Viewport Dependent Configurations](#viewport-dependent-configurations) and [Custom Classes](#custom-classes) for use cases.

#### `grid-core([$ns: 'g'], [$generate: true])`

This will define the core variables and mixins and generate selectors and styles needed for any grid setup,
e.g. clearing on the container, float of cells etc. Generally has to be called only once for any grid setup.

> [Read about namespacing](#namespace)

**Generates**

- `.g-container`
- `.g-cell`

#### `grid-unlock(<$config>)`

Pass in your grid configuration as a list object like with [`grid-bundle()`]((https://github.com/SimonHarte/SpartanGrid/blob/master/README.md#grid-setup)). This will unlock all the grid mixins using your configuration
within the current scope (or globally).

```scss
#my-scope {
	@include grid-unlock($config-list);
	
	.custom-cell {
		@include grid-span(5);
	}
}
```

#### `grid-gutter([$arg1: $spartan-gutter], [$arg2: null])`

Generate only gutter styles. Especially useful if you have grid setups which only differ in the gutter,
so you don't have to generate all classes anew.

**Generates**

- `.g-container`
- `.g-container > .g-cell`

Checkout the [differing gutter setup](https://github.com/SimonHarte/SpartanGrid/tree/master/examples/differing-gutters.scss) example.

You can call `grid-gutter()` without parameters, in that case it simply relies on your unlocked grid configuration,
or you call it with either a fix value which will be taken as is or provide a relation to which a percentage value will be calculated.

**Rely on Config**

```scss
@include grid-gutter();
```

**Fixed values**

```scss
@include grid-gutter(20px);

@include grid-gutter(1.5em);

@include grid-gutter(3%);
```

**Relational percentage value**

```scss
@include grid-gutter(940px, 20px);

@include grid-gutter(60em, 1.5em);
```

#### `grid-generate([prefix: ''], [$cells: $spartan-cells])`

This mixin will generate all configuration sensitive classes like `.g-span-{xx}`, `.g-offset-{xx}` etc. in the current scope.

> [Read about prefixing](#additional-prefix)

**Generates**

- `.g-span`
- `.g-offset`
- `.g-push`
- `.g-pull`

If you pass an optional cell amount, it will use this value for generation while relying on your unlocked config.
So if you know you'll never use classes for more than half the grid width you can reduce output css by only generating those classes:

```
@include grid-generate($cells: 6);
```

### Viewport Dependent Configurations

You can call `grid-unlock()`, `grid-gutter()` and `grid-generate()` **inside media queries** to generate different grid setups for 
different viewports like so:

```scss
// generate base grid styles
@include grid-core();

// adjusting the gutter width and type over different viewports

@media (max-width: 40em) {
	// grid setup for small screen
	@include grid-unlock((100%, 5px, 12));
	@include grid-gutter();
	@include grid-generate();
}
@media (min-width: 40.0625em) and (max-width: 65em) {
	// grid setup for medium screen
	@include grid-unlock((100%, 15px, 12));
	@include grid-gutter();
	@include grid-generate();
}
@media (min-width: 65.0625em) {
	// grid setup for large screen
	@include grid-unlock((100%, percentage(30px / 940px), 12));
	@include grid-gutter();
	@include grid-generate();
}
```

Note that you cannot make a mobile first, global configuration because unlocked mixins like `grid-span()` can not be
reassigned inside media queries and will use global values.

> Of course `grid-generate()` will produce all the grid styles in the given viewport, so with three viewports you'll have three times the normal css. That's why we invested a lot of effort into keeping the base css as tiny as possible ;).

### Custom Classes

#### Namespace

`grid-bundle()` (as well as `grid-core()`) takes an optional parameter `namespace`,
with which you can customize the generated classes.

This namespace is per default set to `g`, but you can freely customize it.

Example with `@include grid-bundle('grid')`:

```css
.grid-container
.grid-cell
.grid-span
.grid-offset
// etc...
```

> You can also remove the namespace by passing an empty string (`''`) instead.

#### Additional Prefix

You can further customize the generated classes through an optional parameter to `grid-generate()` which per default is empty (`''`).
See it as an addition to the namespace which counts for all generated classes while this one only adjusts the configuration sensitive classes.
Lets assume the following setup:

```scss
@include grid-core('grid');
@include grid-unlock($grid-config);
@include grid-generate('test');
```

This will generate the base classes as mentioned in the [namespace section](#namespace):

```css
.grid-container
.grid-cell
```

But the other classes will look like this:

```css
.grid-test-span
.grid-test-offset
// etc...
```

> Check out the ["Twitter Bootstrap"](#the-twitter-bootstrap-way) responsive approach too see how this can be of use.

## Semantic Grid

Spartan comes with two mixins for applying grid styles to any selector:

- `grid-container([$gutter: $spartan-gutter])`
- `grid-cell([$gutter: $spartan-gutter])`

As you could imagine `grid-container()` applies all container styles to your selector and `grid-cell()` does so for cell styles.
You can optionally overwrite the gutter from your previously unlocked settings.

```less
main {
	@include grid-container();
	
	article,
	aside {
		@include grid-cell();
	}
	
	article {
		@include grid-span(8);
	}
	
	aside {
		@include grid-span(4);
	}
}
```

## Responsive Approaches

### The "Spartan Way"

Our idea and recommended way to implement a responsive grid in your project is to create reusable layouts, it reduces output CSS to only what is actually needed.
There are three mixins which will help you create responsive layouts.

```scss
@include grid-cell-set(<$cell-name>, <$cell-span>, [$offset], [$reorder]);
@include grid-cell-set-equal(<$cell-span>);
```

> If your project only consists of layouts and you never use classes like `.grid-span-{xx}` you don't even have to use `grid-generate()`.

#### `grid-cell-set`

Generate a namespaced class `.{cell-name}` as direct child of `.g-container`. Note that `$offset` and `$reorder` are optional parameters
and can be omitted if not used.

> We use direct child selectors so different responsive layouts cannot interfere with each other.

**Params**

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `$cell-name`    | string | | quotes optional, example: `cell-1` |
| `$cells`     | number | only positive | |
| `$offset`      | number | positive or negative | optional, uses `grid-offset()` to apply indents |
| `$reorder`     | number | positive or negative | optional, uses `grid-reorder()` to reposition a cell |

This mixin is used to define different cells inside a layout, so if one cell takes 2/3 of the grid and the other 
1/3 you'd use the mixin twice like this:

```scss
.g-layout-2 {
	// max cells: 12
	@include grid-cell-set('cell-1', 8);
	@include grid-cell-set('cell-2', 4);
}
```

Which will enable you to use `.g-cell-1` and `.g-cell-2` as classes:

```html
<div class="g-container g-layout-2">
	<div class="g-cell g-cell-1"></div>
	<div class="g-cell g-cell-2"></div>
</div>
```

#### `grid-cell-set-equal`

Generate a direct child selector `.g-cell` with the given width and, vertically align items to each other
and add an optional vertical spacing.

**Basic**

```scss
$grid-cells: 12;

.g-layout-1 {
	@include grid-cell-set-equal($grid-cells/4);
}
```

Output CSS:

```css
.g-layout-1 > .g-cell {
	width: 25%;
}

.g-layout-1 > .g-cell:nth-of-type(4n+1) {
	clear: left;
}
```

**Vertical Spacing between**

```scss
$grid-cells: 12;

.g-layout-1 {
	@include grid-cell-set-equal($grid-cells/4, 10px, 'between');
}
```

Output CSS:

```css
.g-layout-1 > .g-cell {
	width: 25%;
}

.g-layout-1 > .g-cell:nth-of-type(4n+1) {
	clear: left;
}

.g-layout-1 > .g-cell:nth-of-type(n+5) {
	margin-top: 10px;
}
```

**Vertical Spacing before**

```scss
$grid-cells: 12;

.g-layout-1 {
	@include grid-cell-set-equal($grid-cells/4, 10px, 'before');
}
```

Output CSS:

```css
.g-layout-1 > .g-cell {
	width: 25%;
}

.g-layout-1 > .g-cell:nth-of-type(4n+1) {
	clear: left;
}

.g-layout-1 > .g-cell {
	margin-top: 10px;
}
```

**Vertical Spacing after**

```scss
$grid-cells: 12;

.g-layout-1 {
	@include grid-cell-set-equal($grid-cells/4, 10px, 'after');
}
```

Output CSS:

```css
.g-layout-1 > .g-cell {
	width: 25%;
}

.g-layout-1 > .g-cell:nth-of-type(4n+1) {
	clear: left;
}

.g-layout-1 > .g-cell {
	margin-bottom: 10px;
}
```

### Responsive Layout Example

> **Note**: With a mobile first approach you either have to declare a media query or omit the definition because of possible interfering pseudo selectors (:nth-of-type).

```scss
.g-layout-1 {
	// grid maximum cells = 12

	// 1 cell in small screen -> no declaration needed

	@media (min-width: 40.0625em) and (max-width: 65em) {
		// 2 cells in medium screen
		@include grid-cell-set-equal(6); // 12 / 2 = 6
	}
	@media (min-width: 65.0625em) {
		// 3 cells in large screen
		@include grid-cell-set-equal(4); // 12 / 3 = 4
	}
}
```

## The "Twitter Bootstrap Way"

If you prefer or have to be able to use a twitter bootstrap like system with viewport specific classes in your markup you can use this technique.
Our highly flexible creation API enables you to generate predefined classes for every viewport you have and set up fully responsive layouts in the markup directly.

Simply make use of the optional parameter to [`grid-generate()`](#custom-classes) inside media queries like the following:

```scss
// grid configuration
$grid-config: 100%, 20px, 12;

@include grid-core(); // base classes, no change in namespace
@include grid-unlock($grid-config);
@include grid-gutter(); // define gutter once

// generate mobile first, small screen classes
@include grid-generate('sm');

// generate medium screen classes
@media (min-width: 40.0625em) and (max-width: 65em) {
	@include grid-generate('md');
}

// generate large screen classes
@media (min-width: 65.0625em) {
	@include grid-generate('lg');
}
```

Now you can use these classes in your markup and the cells will change accordingly throughout viewports.

```html
<div class="g-container">
	<div class="g-cell g-sm-span-6 g-md-span-4 g-lg-span-3"></div>
	<div class="g-cell g-sm-span-6 g-md-span-4 g-lg-span-3"></div>
	<div class="g-cell g-sm-span-6 g-md-span-4 g-lg-span-3"></div>
	<div class="g-cell g-sm-span-6 g-md-span-4 g-lg-span-3"></div>
</div>
```
