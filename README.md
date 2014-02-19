responsibly
===========
The flexible yet simple responsive grid system.

Why
===========
Responsibly arose from a project where we had the need for a fluid responsive grid system with both html and less integration possibilities.
As I couldn't find anything covering the requirements at that time I simply took the time to develop something on my own.
Over time through usage feedback, reviews and optimisations the initial idea developed into this vastly enhanced less grid system, called "responsibly".

How it works
===========
It is quite simple: You define a fixed grid width, a fixed gutter and an amount of grid columns, everything else is done with less.

The fixed widths are just there to calculate the gutter relatively to the given width (or set up a static width grid).
The grid defines a row which has a compensating negative left margin and inside that you have columns with only left margins.

You can set column widths, offsets etc. through specific, short classes or similar named mixins.

Unlike many other grid systems responsibly doesn't use .omega classes or last/first-child selectors or similar to eliminate gutters where required.
Instead you have a consistent structure which enables a simple implementation of responsive layouts.

Getting started
===========
- Integrate responsibly in your project
- adjust ```grid-config.less```
- Use the given classes in your markup or set up your own responsive layouts

Details
===========
Explaining the setup and scheme in dummy less code:

	@grid-fixed-width: 960px;
	@grid-fixed-gutter: 20px;
	@grid-max-cols: 12;
	
	.row {
		.clearfix();
		margin-left: -@gutter;
		
		.col {
			float: left;
			margin-left: @gutter;
		}
		
		.col-span-3 {
			width: 25% - @gutter;
		}
	}

That's basically all there is: a .row, a .col and its .col-span-width

Defining the grid type
===========
There is one special setup variable: ```@grid-type```

With this variable you can define if you either want a fluid or static width grid, the other grid variables stay the same, responsibly just does different calculations using these values.

**Note:** Keep in mind that you most likely can't just switch the grid type mid-project because of nested layouts, where fluid widths apply properly while static widths won't be correct.

Advantages
===========
- Small in size: **~8KB** of less code which per default generates **~2KB** of minified css.
- With minimal configuration you can swiftly set up standard grid layouts using simple, generated classes.
- Provides different less mixins to easily set up responsive layouts as you need them.
- Actually even non-grid layouts are possible using the mixins as the values get calculated in less.

Caveats
===========
- basic knowledge of less needed to set up responsive grid layouts.

Examples
===========
[See fluid responsive example](http://responsibly-grid.herokuapp.com/)

Responsibly is integrated in the [such.less frontend library](https://github.com/MarcDiethelm/such.less) and with that also in the [xtc](https://github.com/MarcDiethelm/xtc) project, check them out!