curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
wasm-pack build --release --target web --out-name wasm --out-dir "$DIR/../static/out"
