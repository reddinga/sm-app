cd semantic
cmd /c gulp build-css
cmd /c gulp build-assets
cd ..
cmd /c rmdir semantic\src\definitions /s /q
cmd /c npm explore semantic-ui gulp install
cmd /k npm install semantic-ui-react --save-dev
