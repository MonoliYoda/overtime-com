<template>
    <b-modal id="edit-modal" @ok="onSubmit">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-container>
          <!---->
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-1"
                label="Project name:"
                label-for="input-1"
                description="Title of the movie of commercial."
              >
                <b-form-input
                  id="input-1"
                  v-model="editingJob.title"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="Producer:"
                label-for="input-2"
                description="Company producing this project."
              >
                <b-form-input
                  id="input-2"
                  v-model="editingJob.employer"
                  type="text"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!---->
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-1"
                label="Notes:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="editingJob.description"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="asd"
                label="Daily rate:"
                label-for="asdi1"
                type="number"
              >
                <b-form-input
                  id="asdi1"
                  v-model="editingJob.dailyRate"
                  type="number"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="asd"
                label="Day hours:"
                label-for="asdi1"
                type="number"
              >
                <b-form-input
                  id="asdi1"
                  v-model="editingJob.workdayHours"
                  type="number"
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <!---->
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-startdate"
                label="Start date:"
                label-for="input-startdate"
              >
                <b-form-datepicker
                  id="input-startdate"
                  v-model="editingJob.startDate"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-starttime"
                label="Start time:"
                label-for="input-starttime"
              >
                <b-form-timepicker
                  id="input-starttime"
                  v-model="editingJob.startTime"
                  now-button
                  required
                ></b-form-timepicker>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-enddate"
                label="End date:"
                label-for="input-enddate"
              >
                <b-form-datepicker
                  id="input-enddate"
                  v-model="editingJob.endDate"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  type="text"
                  required
                ></b-form-datepicker>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-endtime"
                label="End time:"
                label-for="input-endtime"
              >
                <b-form-timepicker
                  id="input-endtime"
                  v-model="editingJob.endTime"
                  now-button
                  required
                ></b-form-timepicker>
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-modal>
</template>

<script>
export default {
    props: ['job', 'newJob'],
    inject: ['fb'],
    data() {
        return {
            editingJob: {},

        }
    },
    methods: {

    }
}
</script>