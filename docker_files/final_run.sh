#!bin/bash
echo 'Running the external database configuration . . .'
/bin/bash configure_db.sh
echo 'Finished database configuration . . .'
echo 'Running salt scripts for the configuration of the app . . . '
/bin/bash run.sh
