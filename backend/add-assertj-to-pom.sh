# add dependencies for assertj # https://stackoverflow.com/q/39325759
sed -i '' 's/<\/dependencies>/<!--ghost-->\r\n<dependency>\r\n<groupId>org.assertj<\/groupId>\r\n<artifactId>assertj-core<\/artifactId>\r\n<version>3.21.0<\/version>\r\n<scope>test<\/scope>\r\n<\/dependency>\r\n<!--ghost-->\r\n<\/dependencies>\r\n/g' pom.xml
sed -i '' 's/<\/dependencies>/<!--ghost-->\r\n<dependency>\r\n<groupId>org.assertj<\/groupId>\r\n<artifactId>assertj-db<\/artifactId>\r\n<version>2.0.2<\/version>\r\n<scope>test<\/scope>\r\n<\/dependency>\r\n<!--ghost-->\r\n<\/dependencies>\r\n/g' pom.xml

