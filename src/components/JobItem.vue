<template>
  <div>
    <div class="job-card">
      <div class="job-title">
        <h4 class="job-title">{{job.title}} - {{job.employer}}</h4>
      </div>
      <div class="job-details">
        <h6 class="job-date">{{job.startDateTime}}</h6>
        <p class="job-desctiption">Dzien 12 z 24</p>
      </div>
      <div class="job-times">
        <p>Work time: 15:40</p>
        <p>Overtime: 04:40</p>
      </div>
      <div class="job-overtimes">
        <p>Overtime pct: 100%</p>
        <p>Overtime pay: 1600zl</p>
      </div>
      <div class="job-edit">
        <button class="job-edit-button">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['job'],
    created() {
      console.log(this.job)
    }

}
</script>