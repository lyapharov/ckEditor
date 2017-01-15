( function() {
	CKEDITOR.plugins.add('aspose', {
			init: function (editor) {
			},

			afterInit: function (editor) {

				function compareCssText( source, target ) {
					function filter( string, propertyName ) {
						// In case of font-families we'll skip quotes. (#10750)
						return propertyName.toLowerCase() == 'font-family' ? string.replace( /["']/g, '' ) : string;
					}

					if ( typeof source == 'string' )
						source = CKEDITOR.tools.parseCssText( source );
					if ( typeof target == 'string' )
						target = CKEDITOR.tools.parseCssText( target, true );

					for ( var name in source ) {
						if ( !( name in target ) ) {
							return false;
						}

						if ( !( filter( target[ name ], name ) == filter( source[ name ], name ) ||
							source[ name ] == 'inherit' ||
							target[ name ] == 'inherit' ) ) {
							return false;
						}
					}
					return true;
				};

				function getAttributesForComparison( styleDefinition ) {
					// If we have already computed it, just return it.
					var attribs = styleDefinition._AC;
					if ( attribs )
						return attribs;

					attribs = {};

					var length = 0;

					// Loop through all defined attributes.
					var styleAttribs = styleDefinition.attributes;
					if ( styleAttribs ) {
						for ( var styleAtt in styleAttribs ) {
							length++;
							attribs[ styleAtt ] = styleAttribs[ styleAtt ];
						}
					}

					// Includes the style definitions.
					var styleText = CKEDITOR.style.getStyleText( styleDefinition );
					if ( styleText ) {
						if ( !attribs.style )
							length++;
						attribs.style = styleText;
					}

					// Appends the "length" information to the object.
					attribs._length = length;

					// Return it, saving it to the next request.
					return ( styleDefinition._AC = attribs );
				};

				CKEDITOR.style.prototype.checkElementMatch = function (element, fullMatch) {
						var def = this._.definition;

						if ( !element || !def.ignoreReadonly && element.isReadOnly() )
							return false;

						var attribs,
							name = element.getName();

						// If the element name is the same as the style name.
						if ( (typeof this.element == 'string' ? name == this.element : name in this.element) || (def.containers && def.containers.indexOf(name) > -1)) {
							// If no attributes are defined in the element.
							if ( !fullMatch && !element.hasAttributes() )
								return true;

							attribs = getAttributesForComparison( def );

							if ( attribs._length ) {
								for ( var attName in attribs ) {
									if ( attName == '_length' )
										continue;

									var elementAttr = element.getAttribute( attName ) || '';

									// Special treatment for 'style' attribute is required.
									if ( attName == 'style' ? compareCssText( attribs[ attName ], elementAttr ) : attribs[ attName ] == elementAttr ) {
										if ( !fullMatch )
											return true;
									} else if ( fullMatch ) {
										return false;
									}
								}
								if ( fullMatch )
									return true;
							} else {
								return true;
							}
						}

						return false;
				};
			}
		});
}());