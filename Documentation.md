# Spartan Grid Documentation

- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
	- [Grid Creation API](#grid-creation-api)
	- [Viewport Dependent Configurations](#viewport-dependent-configurations)
	- [Custom Classes](#custom-classes)
- [Semantic Grid](#semantic-grid)
- [Responsive Approaches](#responsive-approaches)
	- [The "Spartan Way"](#the-spartan-way)
	- [The "Bootstrap Way"](#the-bootstrap-way)

## Basic Usage

All about the basic usage of Spartan is documented in the [project readme](https://github.com/SimonHarte/SpartanGrid/blob/master/README.md#basic-usage).

## Advanced Usage

### Grid Creation API

You would normally just use `grid-bundle()` to set up a grid, but you can also use the following mixins
to generate even more flexible grids, see [Viewport Dependent Configurations](#viewport-dependent-configurations) and [Custom Classes](#custom-classes) for use cases.

#### `grid-core([$namespace: 'g'])`

This will define the core variables and mixins and generate selectors and styles needed for any grid setup,
i.e. clearing on the container, floating of cells etc. Generally has to be called only once for any grid setup.

> Note that once the namespace is defined either with this mixin or `grid-unlock()` it cannot be changed anymore.
[Read about namespacing](#namespace)

**Generates styles for:**

- `.g-container`
- `.g-cell`

#### `grid-unlock(<$config>)`

Pass in your grid configuration like with [`grid-bundle()`]((https://github.com/SimonHarte/SpartanGrid/blob/master/README.md#grid-setup)).
This will unlock all configuration sensitive mixins like `grid-span()`, `grid-offset()` etc.

```scss
@include grid-unlock($config);
	
.custom-cell {
    @include grid-span(5);
}
```

**Params**

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `$width`     | number | `px`, `em` or `%` | |
| `$gutter`    | number | `px`, `em` or `%` | |
| `$cells`     | number | integer | |
| `$namespace` | string | | optional, defaults to `'g'` |

##### `grid-config-set($setting)`

You can adjust specific settings with this mixin like so:

```
@include grid-unlock(100%, 20px, 12);

// change the gutter in configuration, no CSS generated yet
@include grid-config-set('gutter', 5%);
```

#### `grid-gutter([$arg1: $config-gutter], [$arg2: null])`

Generate only gutter styles. Especially useful if you have a grid setup where the gutter changes in different sections,
so you don't have to generate all classes anew.

**Generates Styles for**

- `.g-container`
- `.g-container > .g-cell`

Checkout the [changing gutters](https://github.com/SimonHarte/SpartanGrid/tree/master/examples/changing-gutters.scss) example.

You can call `grid-gutter()` with either a fix value which will be taken as is or provide a relation to which a percentage value will be calculated.

> If you omit the parameter it simply relies on your unlocked configuration.

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

#### `grid-generate([$prefix: ''], [$cells: $config-cells])`

This mixin will generate all configuration sensitive classes like `.g-span-{xx}`, `.g-offset-{xx}` etc.

> [Read about prefixing](#additional-prefix)

**Generates**

- `.g-span-xx`
- `.g-offset-xx`
- `.g-push-xx`
- `.g-pull-xx`

If you pass an optional cell amount, it will use this value for generation while relying on your unlocked configuration.

So if you know you'll never use classes for more than half the grid width you can reduce output css by only generating those classes:

```
@include grid-unlock(100%, 20px, 12);
@include grid-generate($cells: 6);
```

> If you don't pass a prefix as the first parameter you have to name the parameter.

### Viewport Dependent Configurations

You can use `grid-config-set()` or even `grid-unlock()` inside media queries to generate styles for different viewports like so:

```scss
// generate base grid styles
@include grid-core();

// grid setup for mobile first small screen
@include grid-unlock(100%, 5px, 12);
@include grid-gutter();
@include grid-generate();

@media (min-width: 40.0625em) {
	// increase the gutter for medium screen
	@include grid-config-set('gutter', 15px);
	@include grid-gutter();
}

@media (min-width: 65.0625em) {
	// different grid setup for large screen
	@include grid-unlock(940px, percentage(30px / 940px), 12);
	@include grid-gutter();
	@include grid-generate();
}
```

### Custom Classes

#### Namespace

`grid-bundle()` as well as `grid-core()` and `grid-unlock()` take an optional parameter `namespace` (defaults to `'g'`) with which you can customize the generated classes.

Example output with `@include grid-bundle($namespace: 'grid')`:

```css
.grid-container
.grid-cell
.grid-span
.grid-offset
// etc...
```

> You can also remove the namespace by passing an empty string (`''`) instead.

#### Additional Prefix

You can further customize the generated classes through an optional parameter to `grid-generate()` (defaults to an empty string `''`).
See it as an addition to the namespace which counts for all generated classes while this one only adjusts the configuration sensitive classes.
Lets assume the following setup:

```scss
@include grid-core('grid');
@include grid-unlock($some-grid-config);
@include grid-generate('test');
```

This will generate the base classes as mentioned in the [namespace section](#namespace) above:

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

> Check out the ["Bootstrap"](#the-bootstrap-way) responsive approach too see how this can be of use.

## Semantic Grid

Spartan comes with two mixins for applying grid styles to any selector:

- `grid-container([$gutter: $config-gutter])`
- `grid-cell([$gutter: $config-gutter])`

As you could imagine `grid-container()` applies all container styles to your selector and `grid-cell()` does so for cell styles.

You can optionally overwrite the gutter from your previously unlocked settings, but make sure both mixins use the same value.

```less
main {
	@include grid-container(5%);
	
	article,
	aside {
		@include grid-cell(5%);
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

Our recommended way to implement most responsive grids in your project is to create reusable layouts, it reduces output CSS to only what is actually needed.

There are two mixins which will help you create responsive layouts:

```scss
@include grid-cell-set(<$cell-name>, <$cell-span>, [$offset: 0], [$reorder: 0]);
@include grid-cell-set-equal(<$cell-span>, [$vertical-spacing: false], [$spacing-direction: 'between']);
```

> If your project only consists of layouts and you never use classes like `.grid-span-{xx}` you don't even have to use `grid-generate()` in your setup.

#### `grid-cell-set`

Generate a class `.#{$config-namespace}#{$cell-name}` as direct child of `.g-container`. Note that `$offset` and `$reorder` are optional parameters
and can be omitted if not used.

> We use direct child selectors so different responsive layouts cannot interfere with each other.

**Parameters**

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `$cell-name`  | string | example: 'cell-1' | quotes optional |
| `$cells`      | number | only positive | as you would define with `grid-span()` |
| `$offset`     | number | positive or negative | optional, uses `grid-offset()` to apply indents |
| `$reorder`    | number | positive or negative | optional, uses `grid-reorder()` to reposition a cell |

This mixin is used to define different cells inside a layout, so if one cell takes 2/3 of the grid and the other 
1/3 you'd use the mixin twice like this:

```scss
.g-layout-1 {
	// max cells: 12
	@include grid-cell-set('cell-1', 8);
	@include grid-cell-set('cell-2', 4);
}
```

... which will enable you to use `.g-cell-1` and `.g-cell-2` as classes:

```html
<div class="g-container g-layout-1">
	<div class="g-cell g-cell-1"></div>
	<div class="g-cell g-cell-2"></div>
</div>
```

> You can name your layout(s) whatever you like, `g-layout-1` just serves as an example.

#### `grid-cell-set-equal`

Generate a direct child selector `.g-cell` with the given width, vertically align items to each other
and add an optional vertical spacing.

**Params**

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `$cells`     | number | only positive | |
| `$spacing`   | number | `px`, `em` or `%` | optional, add a vertical spacing on rows of cells |
| `$direction` | string | defaults to `'between'`| optional, the spacing direction (`'between'`, `'before'`, `'after'`) |

> Spacing 'between' for example means that there is space between every grid "row", i.e. when cells float down to a new line because there is no more room for them.

### Responsive Layout Example

```scss
.g-layout-1 {
	// grid maximum cells: 12

	// one full-width cell in small screen -> no declaration needed

	@media (min-width: 40.0625em) {
		// two half-width cells in medium screen
		@include grid-cell-set-equal(6); // 12 / 2 = 6
	}

	@media (min-width: 65.0625em) {
		// three even cells in large screen
		@include grid-cell-set-equal(4); // 12 / 3 = 4
	}
}
```

Keep in mind that you don't need to `grid-generate()` all the usual grid styles if you're only using layouts throughout your project.

> With a mobile first approach you either have to declare a media query or omit the definition because of possible interfering pseudo selectors (`:nth-of-type`).

## The "Bootstrap Way"

The highly flexible creation API enables you to generate predefined classes for every viewport you have and set up fully responsive layouts in the markup directly.

If you prefer or have to be able to use a bootstrap grid like system with viewport specific classes in your markup you can use the following technique, simply make use of the optional parameter to [`grid-generate()`](#custom-classes):

```scss
@include grid-core(''); // base classes, remove namespace if preferred
@include grid-unlock(100%, 20px, 12);
@include grid-gutter(); // define gutter once

// generate mobile first, small screen classes
@include grid-generate('sm');

// generate medium screen classes
@media (min-width: 40.0625em) {
	@include grid-generate('md');
}

// generate large screen classes
@media (min-width: 65.0625em) {
	@include grid-generate('lg');
}
```

Now you can use these classes in your markup and the cells will change accordingly throughout viewports.

```html
<div class="container">
	<div class="cell sm-span-6 md-span-4 lg-span-3"></div>
	<div class="cell sm-span-6 md-span-4 lg-span-3"></div>
	<div class="cell sm-span-6 md-span-4 lg-span-3"></div>
	<div class="cell sm-span-6 md-span-4 lg-span-3"></div>
</div>
```
