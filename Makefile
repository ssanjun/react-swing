VERSION:="v`node -pe 'require("./package.json").version'`"

publish:
	@npm publish
	@git tag -a "${VERSION}" -m "tagged for ${VERSION}"
	@git push --tags