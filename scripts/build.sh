DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
wasm-pack build --target web --out-name wasm --out-dir "$DIR/../static/out"
