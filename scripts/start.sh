DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
miniserve "$DIR/../static" --index "$DIR/../static/index.html" -p 3001