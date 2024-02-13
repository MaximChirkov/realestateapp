<template>
    <div class="page-head">
        <div class="container">
            <div class="row">
                <div class="page-head-content">
                    <h1 class="page-title">Hello : <span class="orange strong">Kimaro kyoto</span></h1>
                </div>
            </div>
        </div>
    </div>

    <div class="content-area user-profiel" style="background-color: #FCFCFC;">&nbsp;
        <div class="container">
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1 profiel-container">

                    <form action="#" method="post">
                        <div class="profiel-header">
                            <h3>
                                <b>BUILD</b> YOUR PROFILE <br>
                                <small>This information will let us know more about you.</small>
                            </h3>
                            <hr>
                        </div>

                        <div class="clear">

                            <div class="col-sm-8 col-sm-offset-3 padding-top-25">

                                <div class="form-group">
                                    <label>Name <small>(required)</small></label>
                                    <input name="name" type="text" class="form-control" placeholder="Andrew..." />
                                </div>
                                <div class="form-group">
                                    <label>Email <small>(required)</small></label>
                                    <input name="email" type="email" class="form-control" placeholder="andrew@email@email.com.com" />
                                </div>
                                <div class="form-group">
                                    <label>Phone :</label>
                                    <input name="Phone" type="text" class="form-control" placeholder="+1 9090909090" />
                                </div>
                            </div>

                        </div>

                        <div class="col-sm-5 col-sm-offset-6">
                            <br>
                            <input type='submit' class='btn btn-finish btn-primary' name='finish' value='Finish' />
                        </div>
                        <br>
                    </form>

                </div>
            </div><!-- end row -->

        </div>
    </div>
</template>

<script>
export default {
    name: "EditProfile"
}
</script>
