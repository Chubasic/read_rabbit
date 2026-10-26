# Makefile for src-tauri

# Build the SQLite UUID extension
# Usage: make build-uuid

build-uuid:
	@uname_out=$$(uname -s); \
	# Case OSX
	if [ "$$uname_out" = "Darwin" ]; then \
		clang -fPIC -dynamiclib uuid.c -o uuid.dylib; \
	else \
		gcc -fPIC -shared uuid.c -o uuid.so; \
	fi

# Migration target (placeholder, just run the above and print success)
migration:
	@$(MAKE) build-uuid
	@echo "UUID extension built"

.PHONY: build-uuid migration
