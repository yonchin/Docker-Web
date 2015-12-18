<?php

include  

$dkFileData=<<<EOF
FROM busybox:v0
RUN echo '12345678' > A.txt
EOF;

$tag='t1:v0';