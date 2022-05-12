#!/bin/bash

#  Original solution via StackOverflow:
#    http://stackoverflow.com/questions/35802939/install-only-available-packages-using-conda-install-yes-file-requirements-t
#

#
#  Install via `conda` directly.
#  This will fail to install all
#  dependencies. If one fails,
#  all dependencies will fail to install.
#
conda install -c conda-forge --yes mamba
mamba install -c conda-forge --yes --file requirements.txt

#
#  To go around issue above, one can
#  iterate over all lines in the
#  requirements.txt file.
#
while read requirement; do mamba install --yes $requirement; done <requirements.txt
