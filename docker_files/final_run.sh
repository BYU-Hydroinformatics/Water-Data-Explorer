#!bin/bash

SUB='rds.amazonaws.com'
if [[ $TETHYS_DB_HOST =~ .*"$SUB".* ]]; then
	echo 'Running the external database configuration . . .'
	/bin/bash configure_db.sh
	echo 'Finished database configuration . . .'
	echo 'Running salt scripts for the configuration of the app . . . '
	/bin/bash run.sh
else
	echo 'Running salt scripts for the configuration of the app . . . '
	/bin/bash run.sh
fi